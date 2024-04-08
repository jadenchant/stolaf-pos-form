import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';
import {foundationData} from './CSFormData';

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
  },
  titleSection: {
    margin: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
  },
  headText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  section: {
    margin: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  table: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
  },
  tableClass: {
    width: '45%',
  },
  tablePrereq: {
    width: '35%',
  },
  tableTerm: {
    width: '10%',
  },
  tableYear: {
    width: '10%',
  },
});

const data = {
  name: 'John Doe',
  gradYear: '2024',
};

export const FormPDF = () => (
  <Document
    title="St. Olaf CS Program Of Study Form"
    language="english"
  >
    <Page size="A4" style={styles.page}>
      <View style={styles.titleSection}>
        <Text style={styles.title}>
          Computer Science Major Plan (CSMaP)
        </Text>
      </View>
      <View style={styles.headText}>
        <Text>Name: {data.name}</Text>
        <Text>Expected graduation year: {data.gradYear}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.bold}>Foundational Courses: </Text>
        <Text>Must complete by the end of sophomore year.</Text>
      </View>
      <View style={styles.table}>
        <Text style={styles.tableClass}>Course</Text>
        <Text style={styles.tablePrereq}>Prerequisite(s)</Text>
        <Text style={styles.tableTerm}>Term</Text>
        <Text style={styles.tableYear}>Year</Text>
      </View>
      {foundationData.map((course) => (
        <View style={styles.section} key={course.id}>
          <Text>{course.name}</Text>
          <Text>Prerequisite: {course.prerequisite}</Text>
        </View>
      ))}
    </Page>
  </Document>
);
