"""Отправка уведомления о новом заказе на почту магазина и клиенту."""
import json
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def send_email(to_email: str, subject: str, html_body: str):
    smtp_email = os.environ.get('SMTP_EMAIL', '')
    smtp_password = os.environ.get('SMTP_PASSWORD', '')

    if not smtp_email or not smtp_password:
        return False

    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = f'Вкус жизни <{smtp_email}>'
    msg['To'] = to_email
    msg.attach(MIMEText(html_body, 'html', 'utf-8'))

    # Определяем сервер по домену
    if 'yandex' in smtp_email or 'ya.ru' in smtp_email:
        host, port = 'smtp.yandex.ru', 465
        with smtplib.SMTP_SSL(host, port) as server:
            server.login(smtp_email, smtp_password)
            server.sendmail(smtp_email, to_email, msg.as_string())
    else:
        host, port = 'smtp.gmail.com', 587
        with smtplib.SMTP(host, port) as server:
            server.starttls()
            server.login(smtp_email, smtp_password)
            server.sendmail(smtp_email, to_email, msg.as_string())

    return True


def handler(event: dict, context) -> dict:
    """Принимает данные заказа и отправляет письма на почту магазина и клиента."""
    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    order = body.get('order', {})
    items = body.get('items', [])

    order_id = order.get('id', 'N/A')
    client_name = order.get('name', 'Клиент')
    client_phone = order.get('phone', '')
    client_email = order.get('email', '')
    delivery = order.get('delivery', '')
    address = order.get('address', '')
    payment = order.get('payment', '')
    comment = order.get('comment', '')
    total = order.get('total', 0)

    payment_labels = {
        'card': 'Банковская карта',
        'sbp': 'СБП',
        'invoice': 'Счёт с QR',
        'cash': 'Наличными',
    }
    delivery_labels = {
        'delivery': 'Доставка курьером',
        'pickup': 'Самовывоз',
    }

    items_rows = ''.join(
        f'<tr><td style="padding:6px 12px;border-bottom:1px solid #f0f0f0">{i["name"]}</td>'
        f'<td style="padding:6px 12px;border-bottom:1px solid #f0f0f0;text-align:center">{i["quantity"]} шт.</td>'
        f'<td style="padding:6px 12px;border-bottom:1px solid #f0f0f0;text-align:right;font-weight:600">{i["price"] * i["quantity"]} ₽</td></tr>'
        for i in items
    )

    # Письмо для магазина
    shop_html = f"""
    <div style="font-family:'Golos Text',Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff">
      <div style="background:#E31E24;padding:20px 30px">
        <h1 style="color:#fff;margin:0;font-size:22px">🛒 Новый заказ #{order_id}</h1>
      </div>
      <div style="padding:24px 30px">
        <div style="background:#fff8f8;border-left:4px solid #E31E24;padding:12px 16px;margin-bottom:20px;border-radius:4px">
          <strong>⚠️ Необходимо перезвонить клиенту!</strong><br>
          <span style="font-size:20px;color:#E31E24;font-weight:700">{client_phone}</span>
        </div>

        <h3 style="color:#1a1a1a;margin:0 0 12px">Данные клиента</h3>
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
          <tr><td style="padding:4px 0;color:#666;width:140px">Имя:</td><td style="padding:4px 0;font-weight:600">{client_name}</td></tr>
          <tr><td style="padding:4px 0;color:#666">Телефон:</td><td style="padding:4px 0;font-weight:600">{client_phone}</td></tr>
          <tr><td style="padding:4px 0;color:#666">Email:</td><td style="padding:4px 0">{client_email}</td></tr>
          <tr><td style="padding:4px 0;color:#666">Доставка:</td><td style="padding:4px 0">{delivery_labels.get(delivery, delivery)}</td></tr>
          {'<tr><td style="padding:4px 0;color:#666">Адрес:</td><td style="padding:4px 0">' + address + '</td></tr>' if address else ''}
          <tr><td style="padding:4px 0;color:#666">Оплата:</td><td style="padding:4px 0">{payment_labels.get(payment, payment)}</td></tr>
          {'<tr><td style="padding:4px 0;color:#666">Примечание:</td><td style="padding:4px 0">' + comment + '</td></tr>' if comment else ''}
        </table>

        <h3 style="color:#1a1a1a;margin:0 0 12px">Состав заказа</h3>
        <table style="width:100%;border-collapse:collapse;background:#fafafa;border-radius:8px;overflow:hidden">
          <thead>
            <tr style="background:#f0f0f0">
              <th style="padding:8px 12px;text-align:left;font-size:12px;color:#666">Товар</th>
              <th style="padding:8px 12px;text-align:center;font-size:12px;color:#666">Кол-во</th>
              <th style="padding:8px 12px;text-align:right;font-size:12px;color:#666">Сумма</th>
            </tr>
          </thead>
          <tbody>{items_rows}</tbody>
          <tfoot>
            <tr style="background:#E31E24">
              <td colspan="2" style="padding:10px 12px;color:#fff;font-weight:700">ИТОГО</td>
              <td style="padding:10px 12px;color:#fff;font-weight:700;text-align:right;font-size:18px">{total} ₽</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    """

    # Письмо для клиента
    client_html = f"""
    <div style="font-family:'Golos Text',Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff">
      <div style="background:#E31E24;padding:20px 30px">
        <h1 style="color:#fff;margin:0;font-size:22px">Вкус жизни — заказ принят!</h1>
      </div>
      <div style="padding:24px 30px">
        <p style="font-size:16px;color:#333">Здравствуйте, <strong>{client_name}</strong>!</p>
        <p style="color:#555">Ваш заказ <strong>#{order_id}</strong> успешно оформлен. Наш менеджер свяжется с вами по телефону <strong>{client_phone}</strong> в ближайшее время для подтверждения.</p>

        <div style="background:#fff8f8;border:2px solid #E31E24;border-radius:8px;padding:16px;margin:20px 0">
          <p style="margin:0;color:#E31E24;font-weight:600">📞 Ожидайте звонка от нас!</p>
          <p style="margin:4px 0 0;color:#555;font-size:14px">Мы перезвоним, чтобы уточнить детали и подтвердить заказ.</p>
        </div>

        <h3 style="color:#1a1a1a;margin:0 0 12px">Ваш заказ</h3>
        <table style="width:100%;border-collapse:collapse;background:#fafafa;border-radius:8px;overflow:hidden">
          <thead>
            <tr style="background:#f0f0f0">
              <th style="padding:8px 12px;text-align:left;font-size:12px;color:#666">Товар</th>
              <th style="padding:8px 12px;text-align:center;font-size:12px;color:#666">Кол-во</th>
              <th style="padding:8px 12px;text-align:right;font-size:12px;color:#666">Сумма</th>
            </tr>
          </thead>
          <tbody>{items_rows}</tbody>
          <tfoot>
            <tr style="background:#E31E24">
              <td colspan="2" style="padding:10px 12px;color:#fff;font-weight:700">ИТОГО</td>
              <td style="padding:10px 12px;color:#fff;font-weight:700;text-align:right;font-size:18px">{total} ₽</td>
            </tr>
          </tfoot>
        </table>

        <p style="color:#888;font-size:13px;margin-top:24px">С уважением,<br>Команда «Вкус жизни»</p>
      </div>
    </div>
    """

    shop_email = os.environ.get('SHOP_EMAIL', os.environ.get('SMTP_EMAIL', ''))

    results = {}
    if shop_email:
        results['shop'] = send_email(shop_email, f'🛒 Новый заказ #{order_id} — {client_name} {client_phone}', shop_html)
    if client_email:
        results['client'] = send_email(client_email, f'Ваш заказ #{order_id} принят — Вкус жизни', client_html)

    return {
        'statusCode': 200,
        'headers': cors,
        'body': json.dumps({'ok': True, 'sent': results}),
    }
