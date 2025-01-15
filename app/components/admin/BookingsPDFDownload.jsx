'use client'

import { useState, useEffect } from 'react'
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 24, marginBottom: 10 },
  table: { display: 'table', width: 'auto', borderStyle: 'solid', borderColor: '#bfbfbf', borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0 },
  tableRow: { margin: 'auto', flexDirection: 'row' },
  tableCol: { width: '25%', borderStyle: 'solid', borderColor: '#bfbfbf', borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 },
  tableCell: { margin: 'auto', marginTop: 5, fontSize: 10 }
})

const BookingsPDF = ({ bookings }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Bookings List</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}><Text style={styles.tableCell}>NAME</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Contract no.</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Email</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Program</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>study_gap</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>English_test</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Country_destinations</Text></View>
          
        </View>
        {bookings.map((booking) => (
          <View style={styles.tableRow} key={booking.id}>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{booking.name}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{booking.email}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{booking.contractNo}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{booking.program}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{booking.studyGap}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{booking.englishTest}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{booking.countryDestinations}</Text></View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
)

export default function BookingsPDFDownload({ bookings }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <PDFDownloadLink document={<BookingsPDF bookings={bookings} />} fileName="bookings.pdf">
      {({ blob, url, loading, error }) => (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {loading ? 'Loading document...' : 'Download Bookings PDF'}
        </button>
      )}
    </PDFDownloadLink>
  )
}

