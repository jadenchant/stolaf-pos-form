import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';
import {FormData} from '@/interface';
import {
  foundationData,
  requiredData,
  electiveData,
  otherElectiveData,
} from '../../../data/CSFormData';
import formatID from '../FormatID';

const styles = StyleSheet.create({
  page: {
    padding: 15,
    fontSize: 10,
    fontWeight: 'bold',
  },
  titleSection: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
  },
  headText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    fontSize: 12,
  },
  bold: {
    fontWeight: 'bold',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    fontSize: '12pt',
    marginBottom: 5,
  },
  tableView: {
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 5,
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
  tableClassHeader: {
    width: '45%',
    padding: 5,
    borderRightWidth: 2,
    fontSize: '12pt',
    backgroundColor: '#e4e5eb',
  },
  tablePrereq: {
    width: '35%',
    padding: 5,
    borderRightWidth: 2,
  },
  tablePrereqHeader: {
    width: '35%',
    padding: 5,
    borderRightWidth: 2,
    fontSize: '12pt',
    backgroundColor: '#e4e5eb',
  },
  tableTerm: {
    width: '10%',
    padding: 5,
    borderRightWidth: 2,
  },
  tableTermHeader: {
    width: '10%',
    padding: 5,
    borderRightWidth: 2,
    fontSize: '12pt',
    backgroundColor: '#e4e5eb',
  },
  tableYear: {
    width: '10%',
    padding: 5,
  },
  tableYearHeader: {
    width: '10%',
    padding: 5,
    fontSize: '12pt',
    backgroundColor: '#e4e5eb',
  },
  signature: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallerText: {
    fontSize: '10pt',
  },
  signatureImg: {
    width: '200px',
    height: '20px',
    marginLeft: 10,
  },
  signatureDate: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95px',
    fontSize: '12pt',
  },
});

const termNames = {
  jterm: 'J-Term',
  spring: 'Spring',
  summer: 'Summer',
  fall: 'Fall',
};

const Table = ({data}: {data: FormData[]}) => (
  <View style={styles.tableView}>
    <View style={styles.tableHeader}>
      <Text style={styles.tableClassHeader}>Course</Text>
      <Text style={styles.tablePrereqHeader}>Prerequisite(s)</Text>
      <Text style={styles.tableTermHeader}>Term</Text>
      <Text style={styles.tableYearHeader}>Year</Text>
    </View>
    {data.map((course: FormData) => (
      <View style={styles.table} key={course.id}>
        <Text style={styles.tableClass}>
          {formatID(course.id)}: {course.name}
        </Text>
        <Text style={styles.tablePrereq}>
          {formatID(course.prerequisite)}
        </Text>
        <Text style={styles.tableTerm}>
          {course.term && termNames[course.term]}
        </Text>
        <Text style={styles.tableYear}>{course.year}</Text>
      </View>
    ))}
  </View>
);

interface FormPDFProps {
  formValues: FormData[];
  studentName: string;
  expectedGrad: string;
  studentSigURL: string | null;
  facultySigURL?: string | null;
  directorSigURL?: string | null;
}

export const FormPDF = ({
  formValues,
  studentName,
  expectedGrad,
  studentSigURL,
  facultySigURL,
  directorSigURL,
}: FormPDFProps) => {
  const foundationDataFiltered = formValues.filter((formValue) =>
    foundationData.some(
      (foundationCourse) => foundationCourse.id === formValue.id,
    ),
  );

  const requiredDataFiltered = formValues.filter((formValue) =>
    requiredData.some(
      (requiredCourse) => requiredCourse.id === formValue.id,
    ),
  );

  const electiveDataFiltered = formValues.filter((formValue) =>
    electiveData.some(
      (electiveCourse) => electiveCourse.id === formValue.id,
    ),
  );

  const otherElectiveDataFiltered = formValues.filter((formValue) =>
    otherElectiveData.some(
      (otherElectiveCourse) =>
        otherElectiveCourse.id === formValue.id,
    ),
  );

  return (
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
          <View style={styles.flexRow}>
            <Text>Name: </Text>
            <Text>{studentName}</Text>
          </View>
          <View>
            <View style={styles.flexRow}>
              <Text style={styles.bold}>
                Expected graduation year:{' '}
              </Text>
              <Text>{expectedGrad}</Text>
            </View>
          </View>
        </View>

        {foundationDataFiltered.length > 0 && (
          <View>
            <View style={styles.flexRow}>
              <Text style={styles.bold}>Foundational Courses: </Text>
              <Text style={styles.smallerText}>
                Must complete by the end of sophomore year.
              </Text>
            </View>

            <Table data={foundationDataFiltered} />
          </View>
        )}

        {requiredDataFiltered.length > 0 && (
          <View>
            <View style={styles.flexRow}>
              <Text style={styles.bold}>Required Courses: </Text>
              <Text style={styles.smallerText}>
                Generally completed by end of junior year, perhaps 1
                for senior year.
              </Text>
            </View>

            <Table data={requiredDataFiltered} />
          </View>
        )}

        {electiveDataFiltered.length > 0 && (
          <View>
            <View style={styles.flexRow}>
              <Text style={styles.bold}>Electives: </Text>
              <Text style={styles.smallerText}>
                Complete 3, at least 1 must be 300-level
              </Text>
            </View>
            <View style={styles.flexRow}>
              <Text style={styles.bold}>Designated: </Text>
              <Text style={styles.smallerText}>
                Must complete at least 2 of these
              </Text>
            </View>

            <Table data={electiveDataFiltered} />
          </View>
        )}

        {otherElectiveDataFiltered.length > 0 && (
          <View>
            <View style={styles.flexRow}>
              <Text style={styles.bold}>
                Other electives Include:{' '}
              </Text>
            </View>

            <Table data={otherElectiveDataFiltered} />
          </View>
        )}

        <View style={styles.signature}>
          <View style={styles.flexRow}>
            <Text>Student Signature: </Text>
            {studentSigURL && (
              <Image
                source={{
                  uri: studentSigURL,
                  method: 'GET',
                  headers: {},
                  body: null,
                }}
                style={styles.signatureImg}
              />
            )}
          </View>

          <View style={styles.signatureDate}>
            <Text>Date: </Text>
            {studentSigURL && (
              <Text>{new Date().toLocaleDateString()}</Text>
            )}
          </View>
        </View>
        <View style={styles.signature}>
          <View style={styles.flexRow}>
            <Text>Faculty Signature: </Text>
            {facultySigURL && (
              <Image
                source={{
                  uri: facultySigURL,
                  method: 'GET',
                  headers: {},
                  body: null,
                }}
                style={styles.signatureImg}
              />
            )}
          </View>

          <View style={styles.signatureDate}>
            <Text>Date: </Text>
            {facultySigURL && (
              <Text>{new Date().toLocaleDateString()}</Text>
            )}
          </View>
        </View>
        <View style={styles.signature}>
          <View style={styles.flexRow}>
            <Text>Director Signature: </Text>
            {/* Need to impliment */}
            {directorSigURL && (
              <Image
                source={{
                  uri: directorSigURL,
                  method: 'GET',
                  headers: {},
                  body: null,
                }}
                style={styles.signatureImg}
              />
            )}
          </View>

          <View style={styles.signatureDate}>
            <Text>Date: </Text>
            {directorSigURL && (
              <Text>{new Date().toLocaleDateString()}</Text>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};
