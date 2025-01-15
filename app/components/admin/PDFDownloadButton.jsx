'use client'

import { useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: { padding: 20 },
  title: { fontSize: 18, marginBottom: 10 },
  table: { 
    display: 'table', 
    width: 'auto', 
    borderStyle: 'solid', 
    borderColor: '#bfbfbf', 
    borderWidth: 1, 
    borderRightWidth: 0, 
    borderBottomWidth: 0 
  },
  tableRow: { flexDirection: 'row' },
  tableCol: { 
    width: '14.28%', 
    borderStyle: 'solid', 
    borderColor: '#bfbfbf', 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  },
  tableCell: { margin: 'auto', padding: 2, fontSize: 8 },
  emailCell: { margin: 'auto', padding: 2, fontSize: 7 }, // Reduced font size for email
})

const BookingsPDF = ({ bookings }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Bookings List</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}><Text style={styles.tableCell}>NAME</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Contact No.</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Email</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Program</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Study Gap</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>English Test</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Country Destinations</Text></View>
        </View>
        {bookings.map((booking) => (
          <View style={styles.tableRow} key={booking.id}>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{booking.name}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{booking.contractNo}</Text></View>
            <View style={styles.tableCol}><Text style={styles.emailCell}>{booking.email}</Text></View>
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

export default function PDFDownloadButton({ bookings }) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePDF = async () => {
    setIsGenerating(true)
    try {
      const blob = await pdf(<BookingsPDF bookings={bookings} />).toBlob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'bookings.pdf'
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error generating PDF:', error)
    }
    setIsGenerating(false)
  }

  return (
    <div className="flex flex-col items-center sm:flex-row sm:justify-between gap-4">
      <button
        onClick={generatePDF}
        disabled={isGenerating}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded disabled:opacity-50 w-full sm:w-auto"
      >
        {isGenerating ? 'Generating PDF...' : 'Download Bookings PDF'}
      </button>
    </div>
  )
}
