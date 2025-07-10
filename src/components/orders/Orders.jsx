import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getTheOrders } from '../../redux/billingSlice'

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

import './Orders.css'

const Orders = () => {

  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTheOrders())
  }, [dispatch])

  const { bill, error, loading } = useSelector(state => state.bill)

  console.log("bills", bill);

  const data = bill?.orders
  console.log(data);

  // const handleDownloadPDF = (orderData) => {
  //   console.log('clicked', orderData);

  //   const doc = new jsPDF('p', 'mm', 'a4');
  //   const pageWidth = doc.internal.pageSize.getWidth();

  //   doc.setFont('helvetica', 'bold');
  //   doc.setFontSize(22);
  //   doc.text('Order Summary Report', pageWidth / 2, 20, { align: 'center' });

  //   doc.setFont('helvetica', 'normal');
  //   doc.setFontSize(11);
  //   doc.setTextColor(100);

  //   let startY = 30;

  //   if (!orderData || orderData.length === 0) {
  //     doc.text("No orders available.", 14, startY);
  //   } else {
  //     orderData.forEach((order, index) => {
  //       const orderHeader = `Order #${index + 1} - ${new Date(order.createdAt).toLocaleString()}`;
  //       doc.setTextColor(40);
  //       doc.setFontSize(13);
  //       doc.setFont('helvetica', 'bold');
  //       doc.text(orderHeader, 14, startY);

  //       doc.setFontSize(11);
  //       doc.setFont('helvetica', 'normal');
  //       doc.setTextColor(80);

  //       const details = [
  //         `Name: ${order.firstName}`,
  //         `Email: ${order.email}`,
  //         `Phone: ${order.phone}`,
  //         `Address: ${order.streetAddress}, ${order.appartment}, ${order.city}`,
  //         `Subtotal: ₹${order.subTotal.toLocaleString('en-IN')}`,
  //         `Shipping Fee: ₹${order.shippingFee.toLocaleString('en-IN')}`,
  //         `Total: ₹${order.total.toLocaleString('en-IN')}`,
  //       ];

  //       details.forEach((text, i) => {
  //         doc.text(text, 16, startY + 8 + (i * 6));
  //       });

  //       startY += 8 + (details.length * 6) + 4;

  //       if (Array.isArray(order.productNameAndCount) && order.productNameAndCount.length > 0) {
  //         autoTable(doc, {
  //           head: [['Product', 'Qty', 'Price', 'Total']],
  //           body: order.productNameAndCount.map(product => [
  //             product.productname,
  //             product.count,
  //             `₹${product.price.toLocaleString('en-IN')}`,
  //             `₹${(product.count * product.price).toLocaleString('en-IN')}`
  //           ]),
  //           startY,
  //           styles: { fontSize: 10 },
  //           headStyles: {
  //             fillColor: [219, 68, 68],
  //             textColor: 255,
  //             halign: 'center',
  //           },
  //           bodyStyles: {
  //             textColor: 50
  //           },
  //           margin: { left: 14, right: 14 },
  //           theme: 'striped',
  //         });

  //         startY = doc.previousAutoTable ? doc.previousAutoTable.finalY + 12 : startY + 40;
  //       }
  //       // startY = doc.previousAutoTable.finalY + 12;
  //       // startY = doc.previousAutoTable ? doc.previousAutoTable.finalY + 12 : startY + 40;

  //       // Add new page if content is near bottom
  //       if (startY > 260) {
  //         doc.addPage();
  //         startY = 20;
  //       }
  //     });
  //   }

  //   doc.save("order-summary.pdf");
  // };


  const handleDownloadPDF = (orderData) => {
    console.log('clicked', orderData);

    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('Order Summary Report', pageWidth / 2, 20, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(100);

    let startY = 30;

    // ✅ Ensure it's always treated as an array
    const orders = Array.isArray(orderData) ? orderData : [orderData];

    if (orders.length === 0) {
      doc.text("No orders available.", 14, startY);
    } else {
      orders.forEach((order, index) => {
        const orderHeader = `Order #${order._id } - ${new Date(order.createdAt).toLocaleString()}`;
        doc.setTextColor(40);
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text(orderHeader, 14, startY);

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(80);

        const details = [
          `Name: ${order.firstName}`,
          `Email: ${order.email}`,
          `Phone: ${order.phone}`,
          `Address: ${order.streetAddress}, ${order.appartment}, ${order.city}`,
          `Subtotal: ₹${order.subTotal.toLocaleString('en-IN')}`,
          `Shipping Fee: ₹${order.shippingFee.toLocaleString('en-IN')}`,
          `Total: ₹${order.total.toLocaleString('en-IN')}`,
        ];

        details.forEach((text, i) => {
          doc.text(text, 16, startY + 8 + (i * 6));
        });

        startY += 8 + (details.length * 6) + 4;

        if (Array.isArray(order.productNameAndCount) && order.productNameAndCount.length > 0) {
          autoTable(doc, {
            head: [['Product', 'Qty', 'Price', 'Total']],
            body: order.productNameAndCount.map(product => [
              product.productname,
              product.count,
              `₹${product.price.toLocaleString('en-IN')}`,
              `₹${(product.count * product.price).toLocaleString('en-IN')}`
            ]),
            startY,
            styles: { fontSize: 10 },
            headStyles: {
              fillColor: [219, 68, 68],
              textColor: 255,
              halign: 'center',
            },
            bodyStyles: {
              textColor: 50
            },
            margin: { left: 14, right: 14 },
            theme: 'striped',
          });

          startY = doc.previousAutoTable ? doc.previousAutoTable.finalY + 12 : startY + 40;
        }

        // Add new page if content is near bottom
        if (startY > 260) {
          doc.addPage();
          startY = 20;
        }
      });
    }

    doc.save("order-summary.pdf");
  };

  return (
    <div className='order-component'>
      <div>
        <p>home{location.pathname}</p>
      </div>
      <div className='order-compoent-container-two'>
        <div className='order-compoent-container-two-sub-one'>
          {data?.map((order, index) => (
            <div
              key={order._id}
              className='order-compoent-container-two-sub-two'
            >
              <div >
                <h3 style={{ color: '#DB4444' }}>Order #{index + 1}</h3>
                <p><strong>Name:</strong> {order.firstName}</p>
                <p><strong>Email:</strong> {order.email}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
                <p><strong>Address:</strong> {order.streetAddress}, {order.appartment}, {order.city}</p>
                <p><strong>Total:</strong> ₹{order.total.toLocaleString('en-IN')}</p>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <div className='order-card-button'>
                <button onClick={() => handleDownloadPDF(order)}>Download</button>
              </div>
              {/* <div style={{ marginTop: '10px' }}>
                <h4>Products:</h4>
                <ul style={{ paddingLeft: '20px' }}>
                  {order.productNameAndCount.map((product, i) => (
                    <li key={i}>
                      {product.productname} × {product.count} = ₹{(product.price * product.count).toLocaleString('en-IN')}
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Orders