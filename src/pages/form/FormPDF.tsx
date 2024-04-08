import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';
import {
  electiveData,
  foundationData,
  otherElectiveData,
  requiredData,
} from './CSFormData';
import formatID from './FormatID';
import {ClassData} from '@/interface';

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
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
  tableView: {
    marginRight: 5,
    marginLeft: 5,
  },
  table: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 5,
    marginLeft: 5,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
  },
  tableHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 5,
    marginLeft: 5,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    fontWeight: 'bold',
  },
  tableClass: {
    width: '45%',
    padding: 5,
    borderRightWidth: 2,
  },
  tablePrereq: {
    width: '35%',
    padding: 5,
    borderRightWidth: 2,
  },
  tableTerm: {
    width: '10%',
    padding: 5,
    borderRightWidth: 2,
  },
  tableYear: {
    width: '10%',
    padding: 5,
  },
  signature: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const data = {
  name: 'John Cena',
  gradYear: '1993',
};

const Table = ({data}: {data: ClassData[]}) => (
  <View style={styles.tableView}>
    <View style={styles.tableHeader}>
      <Text style={styles.tableClass}>Course</Text>
      <Text style={styles.tablePrereq}>Prerequisite(s)</Text>
      <Text style={styles.tableTerm}>Term</Text>
      <Text style={styles.tableYear}>Year</Text>
    </View>
    {data.map((course: ClassData) => (
      <View style={styles.table} key={course.id}>
        <Text style={styles.tableClass}>
          {formatID(course.id)}: {course.name}
        </Text>
        <Text style={styles.tablePrereq}>
          {formatID(course.prerequisite)}
        </Text>
        <Text style={styles.tableTerm}>Spring</Text>
        <Text style={styles.tableYear}>2024</Text>
      </View>
    ))}
  </View>
);

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
        <View>
          <Text style={styles.bold}>Name: </Text>
          <Text>{data.name}</Text>
        </View>
        <View>
          <Text style={styles.bold}>Expected graduation year: </Text>
          <Text>{data.gradYear}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.bold}>Foundational Courses: </Text>
        <Text>Must complete by the end of sophomore year.</Text>
      </View>

      <Table data={foundationData} />

      <View style={styles.section}>
        <Text style={styles.bold}>Required Courses: </Text>
        <Text>
          Generally completed by end of junior year, perhaps 1 for
          senior year.
        </Text>
      </View>

      <Table data={requiredData} />

      <View style={styles.section}>
        <Text style={styles.bold}>Electives: Complete 3, </Text>
        <Text>at least 1 must be 300-level</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.bold}>Designated: </Text>
        <Text>Must complete at least 2 of these</Text>
      </View>

      <Table data={electiveData} />

      <View style={styles.section}>
        <Text style={styles.bold}>Other electives Include: </Text>
      </View>

      <Table data={otherElectiveData} />

      <View style={styles.signature}>
        <Text>Student Signature: </Text>
        <Text>Date: </Text>
      </View>
      <View style={styles.signature}>
        <Text>Faculty Signature: </Text>
        <Text>Date: </Text>
      </View>
      <View style={styles.signature}>
        <Text>CS Director Signature: </Text>
        <Text>Date: </Text>
      </View>
    </Page>
  </Document>
);
