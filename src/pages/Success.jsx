/* eslint-disable no-constant-binary-expression */
import {
  Document,
  Page,
  PDFDownloadLink,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { useEffect, useState } from 'react';

import { useCartStore } from '@/zustand/apis/CartStore';
import { useUser } from '@/zustand/apis/userState';
const generateInvoiceNo = async () => {
  const now = new Date();

  // Extract date components
  const year = now.getFullYear().toString().slice(-2); // Last 2 digits of the year
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Month (01-12)
  const day = now.getDate().toString().padStart(2, '0'); // Day (01-31)
  const hours = now.getHours().toString().padStart(2, '0'); // Hours (00-23)
  const minutes = now.getMinutes().toString().padStart(2, '0'); // Minutes (00-59)
  const seconds = now.getSeconds().toString().padStart(2, '0'); // Seconds (00-59)

  // Combine components to form the base
  let baseInvoiceNo = `${year}${month}${day}${hours}${minutes}${seconds}`;

  // Ensure it's exactly 15 characters
  if (baseInvoiceNo.length > 15) {
    baseInvoiceNo = baseInvoiceNo.slice(0, 15);
  } else if (baseInvoiceNo.length < 15) {
    const extraChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    while (baseInvoiceNo.length < 15) {
      baseInvoiceNo += extraChars.charAt(
        Math.floor(Math.random() * extraChars.length)
      );
    }
  }

  // Convert to uppercase (already uppercase since it's numeric + random letters)
  return baseInvoiceNo.toUpperCase();
};
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    textAlign: 'center',
  },
  tableHeader: {
    fontWeight: 'bold',
  },
  total: {
    marginTop: 10,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

const InvoiceDocument = ({ data, userData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Invoice</Text>
      <View style={styles.section}>
        <Text>Invoice Number: {data.invoiceNumber}</Text>
        <Text>Date: {new Date().toLocaleDateString()}</Text>
        <Text>Customer Name: {userData?.name || 'Customer'}</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCol, styles.tableHeader]}>Product</Text>
          <Text style={[styles.tableCol, styles.tableHeader]}>Quantity</Text>
          <Text style={[styles.tableCol, styles.tableHeader]}>Price</Text>
          <Text style={[styles.tableCol, styles.tableHeader]}>Total</Text>
        </View>
        {data.order.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCol}>{item.productId.name || 'N/A'}</Text>
            <Text style={styles.tableCol}>{item.quantity}</Text>
            <Text style={styles.tableCol}>
              {`${item.productId.packetPrice} / ${item.productId.packetQuantity} ${item.productId.packetUnit}` ||
                'N/A'}
            </Text>
            <Text style={styles.tableCol}>{item.totalAmt}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.total}>Total: ₹{data.checkoutAmt || 0}</Text>
    </Page>
  </Document>
);

const Success = () => {
  const { getCart, checkoutCart } = useCartStore();
  const { userData } = useUser();
  const [data, setData] = useState(null);
  const checkoutDetails = JSON.parse(localStorage.getItem('cartData'));
  const fetchCartDetails = async () => {
    if (!userData?.cart) return;

    try {
      const response = await getCart(userData.cart);
      if (response?.cart?.purchasedHistory) {
        const lastHistoryItem =
          response.cart.purchasedHistory[
            response.cart.purchasedHistory.length - 1
          ];
        console.log(lastHistoryItem);

        const invoiceNumber = await generateInvoiceNo();
        setData({ ...lastHistoryItem, invoiceNumber });
      }
    } catch (error) {
      console.error('Error fetching cart details:', error);
    }
  };
  const checkOut = async () => {
    try {
      const response = await checkoutCart(checkoutDetails);
      console.log(response);
      localStorage.removeItem('cartData');
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };
  useEffect(() => {
    fetchCartDetails();
    checkOut();
  }, [userData?.cart]);
  console.log(data);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="pt-16 min-h-screen">
      <h2>Invoice Preview</h2>
      {/* PDF Preview */}
      <PDFViewer style={{ width: '100%', height: '80vh', border: 'none' }}>
        <InvoiceDocument data={data} userData={userData} />
      </PDFViewer>

      {/* PDF Download Link */}
      <div style={{ marginTop: '20px' }}>
        <PDFDownloadLink
          document={<InvoiceDocument data={data} userData={userData} />}
          fileName="invoice.pdf"
        >
          {({ loading }) =>
            loading ? 'Preparing document...' : 'Download Invoice'
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default Success;
