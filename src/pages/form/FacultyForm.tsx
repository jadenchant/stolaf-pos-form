import {useRef, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {PDFViewer} from '@react-pdf/renderer';
import SignatureCanvas from 'react-signature-canvas';
import {
  Button,
  Card,
  Modal,
  Radio,
  TextArea,
} from '@gravity-ui/uikit';
import {FormData} from '../../interface';
import useScreenSize from '../../hooks/useScreenSize';
import {FormPDF} from './components/FormPDF';
import Form from './components/Form';
import form0 from '../../data/form0.json';
import form1 from '../../data/form1.json';
import form2 from '../../data/form2.json';
import form3 from '../../data/form3.json';
import form4 from '../../data/form4.json';
import form5 from '../../data/form5.json';
import form6 from '../../data/form6.json';
import form7 from '../../data/form7.json';
import form8 from '../../data/form8.json';

const forms: any = [
  form0,
  form1,
  form2,
  form3,
  form4,
  form5,
  form6,
  form7,
  form8,
];

// Cancel doesn't save the form
// NO Save (don't need to save anything, just submit)
// Submit sends a post requst to the database for both form data and form status
// Changes status to submitted_for_review
// Save Signature sends a post request to the database

const FacultyForm = () => {
  const screenSize = useScreenSize();

  const navigate = useNavigate();
  const location = useLocation();

  const lastCharacter = location.pathname.slice(-1);

  let formDataJson = [];

  if (!isNaN(Number(lastCharacter))) {
    formDataJson = forms[lastCharacter];
  }

  const [formStatus] = useState<string>(formDataJson.formStatus);

  const isRejected: boolean = formDataJson.isRejected;

  const [rejectionReasons, setRejectionReasons] = useState<string>(
    isRejected ? formDataJson.rejectionReasons : '',
  );

  const facultyName: string = formDataJson.facultyName
    ? formDataJson.facultyName
    : '';

  const studentName: string = formDataJson.studentName
    ? formDataJson.studentName
    : '';

  const expectedGrad: string = formDataJson.expectedGrad
    ? formDataJson.expectedGrad
    : '';

  const [formValues, setFormValues] = useState<FormData[]>(
    formDataJson.classes as FormData[],
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

  const [approval, setApproval] = useState<string | null>(null);

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

      <h2 className="text-xl mt-4">Student: {studentName}</h2>

      <Form
        // CHANGE BACK TO formStatus={formStatus}
        // formStatus={formStatus}
        formStatus={'submitted_for_review'}
        formValues={formValues}
        setFormValues={setFormValues}
        className="mt-6"
      />

      <PDFViewer width="100%" height="800" className="mt-8">
        <FormPDF
          formValues={formValues}
          studentName={studentName}
          expectedGrad={expectedGrad}
          studentSigURL={null}
          facultySigURL={imageURL}
        />
      </PDFViewer>

      <div className="flex justify-center mt-8">
        <Radio
          content="Approve"
          value="approved"
          size="l"
          disabled={formStatus === 'complete'}
          checked={approval === 'approved'}
          onUpdate={(value) =>
            value ? setApproval('approved') : null
          }
          className="mr-4"
        />
        <Radio
          content="Reject"
          value="rejected"
          size="l"
          disabled={formStatus === 'complete'}
          checked={approval === 'rejected'}
          onUpdate={(value) =>
            value ? setApproval('rejected') : null
          }
          className="ml-4"
        />
      </div>

      {approval === 'rejected' && (
        <div className="flex justify-center mt-8">
          <TextArea
            size="l"
            minRows={2}
            placeholder="Reasons for Rejection"
            value={rejectionReasons}
            onUpdate={(value) => setRejectionReasons(value)}
          />
        </div>
      )}

      <div className="flex justify-center mt-12">
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
          formStatus !== 'in_progress' && formStatus !== 'complete'
            ? 'justify-between'
            : 'justify-center'
        } my-20 mx-4`}
      >
        <Button view="normal" size="l" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        {formStatus !== 'in_progress' &&
          formStatus !== 'complete' && (
            <Link to="/faculty">
              <Button view="action" size="l">
                Submit
              </Button>
            </Link>
          )}
      </div>
    </div>
  );
};

export default FacultyForm;
