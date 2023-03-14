const nodemailer = require("nodemailer")

module.exports.sendOrderCreatedSuccessEmail = async (order) => {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const info = await transporter.sendMail({
        from: 'tuvtcfx10680@funix.edu.vn', // sender address
        to: `${order.email}`, // list of receivers
        subject: "New Order has been created successfully", // Subject line
        html: generateOrderCreatedSuccessEmail(order), // html body
    });
    
    return nodemailer.getTestMessageUrl(info)
}

const generateOrderCreatedSuccessEmail = (order) => {
    const { fullName, phone, address, totalBill, products } = order
    return `
        <html>
            <head>
                <style>
                    body {
                        background-color: #000;
                        color: #fff;
                    }

                    table, th, td {
                        border: 1px solid;
                    }
                </style>
            </head>
            <body>
                <h2>Xin Chào ${fullName}</h2>
                <p>Phone: ${phone}</p>
                <p>Address: ${address}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Tên Sản Phẩm</th>
                            <th>Hình Ảnh</th>
                            <th>Giá</th>
                            <th>Số Lượng</th>
                            <th>Thành Tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${
                            products.map(({ quantity, price, product }) => (
                                `<tr>
                                    <td>${ product.name }</td>
                                    <td><img style='width: 80px; height: 80px;' src='${product.img1}' /></td>
                                    <td>${ price } VND</td>
                                    <td>${ quantity }</td>
                                    <td>${ price * quantity } VND</td>
                                </tr>`
                            )).join('')
                        }
                    </tbody>
                </table>
                <h2>Tổng Thanh Toán:</h2>
                <h2>${totalBill} VND</h2>
                <br />
                <h2>Cảm ơn bạn!</h2>
            </body>
        </html>
    `
}