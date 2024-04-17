import {useRef, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {PDFViewer} from '@react-pdf/renderer';
import SignatureCanvas from 'react-signature-canvas';
import useScreenSize from '../../hooks/useScreenSize';
import {Button, Modal} from '@gravity-ui/uikit';
import ElectiveSelect from './ElectiveSelect';
import {FormData} from '../../interface';
import ClassTable from './ClassTable';
import {
  foundationData,
  requiredData,
  electiveData,
  otherElectiveData,
} from './CSFormData';
import form0 from '../../data/form0.json';
import form1 from '../../data/form1.json';
import form2 from '../../data/form2.json';
import form3 from '../../data/form3.json';
import formatID from './FormatID';

import {FormPDF} from './FormPDF';

const forms: any = [form0, form1, form2, form3];

// Cancel doesn't save the form
// Save sends a post request to the database
// Submit sends a post requst to the database for both form data and form status
// Changes status to submitted_for_review

const Form = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const screenSize = useScreenSize();

  const sigCanvas = useRef<SignatureCanvas | null>(null);
  const [openModel, setOpenModal] = useState(false);

  const lastCharacter = location.pathname.slice(-1);

  let formDataJson = [];

  if (!isNaN(Number(lastCharacter))) {
    formDataJson = forms[lastCharacter];
  }

  const [formValues, setFormValues] = useState<FormData[]>(
    formDataJson as FormData[],
  );

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
        St. Olaf Program of Study Form
      </h1>
      <div className="">
        <h2 className="text-2xl font-bold mt-8 mb-2">
          Foundational Courses
        </h2>
        <p className="mb-2">
          Must complete by the end of sophomore year.
        </p>
        <ClassTable
          selectedValues={foundationData}
          formValues={formValues}
          setFormValues={setFormValues}
          classNames="mb-8"
        />
        <h2 className="text-2xl font-bold mt-8 mb-4">
          Required Courses
        </h2>
        <p className="mb-2">
          Generally completed by end of junior year, perhaps 1 for
          senior year.
        </p>
        <ClassTable
          selectedValues={requiredData}
          formValues={formValues}
          setFormValues={setFormValues}
          classNames="mb-8"
        />
        <h2 className="text-2xl font-bold mb-2">Electives</h2>
        <p className="mb-2">
          Complete 3, at least 1 must be 300-level
        </p>

        <div className="flex justify-between mb-2 align-baseline">
          <h2 className="text-lg font-bold">
            Designated:{' '}
            <span className="text-sm font-normal">
              Select at least 2 classes
            </span>
          </h2>
          <div className="flex flex-col justify-end mr-8">
            <p className="h-5">Prerequisites</p>
          </div>
        </div>

        <ElectiveSelect
          classes={electiveData}
          formValues={formValues}
          setFormValues={setFormValues}
        />

        <ClassTable
          selectedValues={electiveData.filter((elective) =>
            formValues.some(
              (formValue) =>
                formatID(elective.id) === formatID(formValue.id),
            ),
          )}
          formValues={formValues}
          setFormValues={setFormValues}
          classNames="mb-8"
        />

        <div className="flex justify-between mb-2 align-baseline">
          <h2 className="text-lg font-bold">Other Electives</h2>
          <div className="flex flex-col justify-end mr-8">
            <p className="h-5">Prerequisites</p>
          </div>
        </div>

        <ElectiveSelect
          classes={otherElectiveData}
          formValues={formValues}
          setFormValues={setFormValues}
          isOtherElective
        />

        <ClassTable
          selectedValues={otherElectiveData.filter((elective) =>
            formValues.some(
              (formValue) =>
                formatID(elective.id) === formatID(formValue.id),
            ),
          )}
          formValues={formValues}
          setFormValues={setFormValues}
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
                  screenSize.width > 800
                    ? 800
                    : screenSize.width - 60,
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
          <div className="flex justify-center mt-8 bg-slate-200">
            <img
              src={imageURL}
              alt="signature"
              className="signature"
            />
          </div>
        )}

        <div className="flex justify-between mt-20">
          <Button view="normal" size="l" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Link to="/student">
            <Button view="action" size="l">
              Save
            </Button>
          </Link>
          <Link to="/student">
            <Button view="action" size="l">
              Submit
            </Button>
          </Link>
        </div>

        {/* Temporary To View PDF */}
        <PDFViewer width="100%" height="800">
          <FormPDF />
        </PDFViewer>
      </div>
    </div>
  );
};

export default Form;
