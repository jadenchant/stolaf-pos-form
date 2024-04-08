import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  headText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
  },
});

const data = {
  name: 'John Doe',
  gradYear: '2024',
};

export const FormPDF = () => (
  <Document title="St. Olaf Program Of Study Form" language="english">
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>
          Computer Science Major Plan (CSMaP)
        </Text>
      </View>
      <View style={styles.headText}>
        <Text>Name: {data.name}</Text>
        <Text>Expected graduation year: {data.gradYear}</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);
