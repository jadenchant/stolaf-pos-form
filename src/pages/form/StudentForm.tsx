import {useRef, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
// import {PDFViewer} from '@react-pdf/renderer';
import SignatureCanvas from 'react-signature-canvas';
import {Button, Card, Modal, Select} from '@gravity-ui/uikit';
import {FormData} from '../../interface';
import useScreenSize from '../../hooks/useScreenSize';
import Form from './components/Form';
// import {FormPDF} from './components/FormPDF';
import faculty from '../../data/faculty.json';
import form0 from '../../data/form0.json';
import form1 from '../../data/form1.json';
import form2 from '../../data/form2.json';
import form3 from '../../data/form3.json';
import form4 from '../../data/form4.json';

const forms: any = [form0, form1, form2, form3, form4];

// Cancel doesn't save the form
// Save sends a post request to the database
// Submit sends a post requst to the database for both form data and form status
// Changes status to submitted_for_review
// Save Signature sends a post request to the database

const StudentForm = () => {
  const screenSize = useScreenSize();

  const navigate = useNavigate();
  const location = useLocation();

  let formDataJson = [];

  const pathname = location.pathname;
  const formID = pathname.match(/\/(\d+)$/);

  if (formID) {
    console.log(formID[1]);
    formDataJson = forms[parseInt(formID[1], 10)];
  }

  const [formStatus] = useState<string>(
    formDataJson ? formDataJson.formStatus : 'in_progress',
  );

  const isRejected: boolean = formDataJson
    ? formDataJson.isRejected
    : false;

  const rejectionReasons: string = isRejected
    ? formDataJson.rejectionReasons
    : '';

  const [facultyName, setFacultyName] = useState<string[]>([
    formDataJson && formDataJson.facultyName
      ? formDataJson.facultyName
      : '',
  ]);

  const [formValues, setFormValues] = useState<FormData[]>(
    formDataJson ? (formDataJson.classes as FormData[]) : [],
  );

  const sigCanvas = useRef<SignatureCanvas | null>(null);
  const [openModel, setOpenModal] = useState(false);
  const [imageURL, setImageURL] = useState<string | null>(null);

  const create = () => {
    if (sigCanvas.current) {
      const URL = sigCanvas.current
        .getTrimmedCanvas()
        .toDataURL('image/png');
      setImageURL(URL);
    }
    setOpenModal(false);
  };

  return (
    <div className="lg:w-[1000px] md:w-[800px] w-[375px] md:text-sm text-[10px]">
      <h1 className="text-3xl font-bold">
        St. Olaf Computer Science MaP
      </h1>

      {isRejected && (
        <Card
          theme="warning"
          type="container"
          view="filled"
          className="mt-4"
        >
          <div className="p-4 lg:p-6">
            <div className="flex flex-col md:flex-row">
              <p className="mr-2 mb-2 text-[14pt]">
                Rejection Reasons:
              </p>
              <p className="text-[11pt] leading-6">
                {rejectionReasons}
              </p>
            </div>
            <p className="text-[11pt] text-right">- {facultyName}</p>
          </div>
        </Card>
      )}

      <div className="mt-8">
        <p className="text-sm mb-2">
          Select a Faculty Member to Review:
        </p>

        <div className="flex justify-center md:justify-start md:w-72 ">
          <Select
            size="l"
            width="max"
            label="Faculty:"
            filterable
            value={facultyName}
            onUpdate={(value: string[]) => setFacultyName(value)}
            disabled={
              formStatus === 'submitted_for_review' ||
              formStatus === 'complete'
            }
          >
            {faculty.map((faculty, index) => (
              <Select.Option key={index} value={faculty}>
                {faculty}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>

      <Form
        formStatus={formStatus}
        formValues={formValues}
        setFormValues={setFormValues}
        className="mt-6"
      />

      <div className="flex justify-center mt-8">
        <Button onClick={() => setOpenModal(true)} view="action">
          Create Signature
        </Button>
      </div>

      <Modal open={openModel} onClose={() => setOpenModal(false)}>
        <div className="flex flex-col justify-center items-center m-4">
          <SignatureCanvas
            penColor="black"
            canvasProps={{
              width:
                screenSize.width > 800 ? 800 : screenSize.width - 60,
              height: 200,
              className: 'bg-white',
            }}
            ref={sigCanvas as any}
          />

          <div className="flex justify-between mt-3 w-11/12 max-w-[400px]">
            <Button
              onClick={() => setOpenModal(false)}
              size="l"
              view="outlined-warning"
            >
              Cancel
            </Button>
            <Button
              onClick={() => sigCanvas.current?.clear()}
              size="l"
              view="outlined-warning"
            >
              Clear
            </Button>
            <Button onClick={create} size="l" view="action">
              Save
            </Button>
          </div>
        </div>
      </Modal>

      {imageURL && (
        <div className="flex justify-center mt-8 bg-slate-100">
          <img src={imageURL} alt="signature" className="signature" />
        </div>
      )}

      <div
        className={`flex ${
          formStatus !== 'submitted_for_review' &&
          formStatus !== 'complete'
            ? 'justify-between'
            : 'justify-center'
        } mt-20 mx-4`}
      >
        <Button view="normal" size="l" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        {formStatus !== 'submitted_for_review' &&
          formStatus !== 'complete' && (
            <Link to="/student">
              <Button view="action" size="l">
                Save
              </Button>
            </Link>
          )}
        {formStatus !== 'submitted_for_review' &&
          formStatus !== 'complete' && (
            <Link to="/student">
              <Button view="action" size="l">
                Submit
              </Button>
            </Link>
          )}
      </div>

      {/* Temporary To View PDF */}
      {/* <PDFViewer width="100%" height="800" className="mt-8">
        <FormPDF
          formValues={formValues}
          studentName={formDataJson.studentName}
          expectedGrad={formDataJson.expectedGrad}
          studentSigURL={imageURL}
        />
      </PDFViewer> */}
    </div>
  );
};

export default StudentForm;
