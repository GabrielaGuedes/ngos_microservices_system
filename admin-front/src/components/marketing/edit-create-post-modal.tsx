import {
  DateInput,
  FileInput,
  Form,
  FormField,
  TextArea,
  TextInput,
} from "grommet";
import React, { useState } from "react";
import { useEffect } from "react";
import { addFiles } from "../../requests/marketing/add-files";
import { createPost } from "../../requests/marketing/create-post";
import { INewPost, IPost } from "../../requests/marketing/types";
import { updatePost } from "../../requests/marketing/update-post";
import {
  HalfFieldContainer,
  TupleFieldContainer,
} from "../../ui-components/base-containers/base-containers";
import Modal from "../../ui-components/modal/modal";
import {
  errorToast,
  loadingToast,
  successToast,
} from "../../ui-components/toasts/toasts";
import { cleanEmptyEntries } from "../../utils/empty-entries-cleaner";
import { FilesLabel } from "./edit-create-post-modal.style";

interface IEditCreatePostModal {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  refreshData: () => void;
  data?: IPost;
  creation?: boolean;
}

const EditCreatePostModal: React.FC<IEditCreatePostModal> = ({
  isOpen,
  setIsOpen,
  refreshData,
  data,
  creation,
}) => {
  const [formValues, setFormValues] = useState<INewPost | any>(data);
  const [formIsInvalid, setFormIsInvalid] = useState<boolean>(
    Boolean(creation)
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [fileNames, setFileNames] = useState<string[]>();

  useEffect(() => {
    // getFile("multiple_files-1625709537028.jpeg")
    //   .then(async (file) => setFileNames([await file.blob()]))
    //   .catch(() => errorToast());
  }, []);

  const formattedFormValues = () => {
    const withDateFormatted = {
      ...formValues,
      postedAt: formValues.postedAt?.substring(0, 10),
      filePaths: fileNames,
    };
    return cleanEmptyEntries(withDateFormatted);
  };

  const handleSuccess = () => {
    refreshData();
    creation && setFormValues({});
    setLoading(false);
    successToast();
    setIsOpen(false);
  };

  const handleError = () => {
    errorToast();
    setLoading(false);
    setFormIsInvalid(false);
  };

  const handleConfirm = () => {
    setLoading(true);
    loadingToast();
    if (creation) {
      createPost(formattedFormValues() as INewPost)
        .then(() => {
          handleSuccess();
        })
        .catch(() => {
          handleError();
        });
    } else {
      data &&
        updatePost(formattedFormValues() as INewPost, data?.id)
          .then(() => {
            handleSuccess();
          })
          .catch(() => {
            handleError();
          });
    }
  };

  return (
    <Modal
      title={creation ? "Novo post" : "Editar post"}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      footer
      confirmLabel={creation ? "Criar" : "Editar"}
      onConfirm={handleConfirm}
      confirmDisabled={formIsInvalid || loading}
    >
      <Form
        validate="change"
        value={formValues}
        onChange={(nextValue) => setFormValues(nextValue)}
        onValidate={(event) => {
          setFormIsInvalid(!event.valid);
        }}
        messages={{ required: "Obrigatório" }}
      >
        <FormField label="Título" name="title" required>
          <TextInput name="title" placeholder="Post incrivel para Facebook" />
        </FormField>
        <FormField label="Texto" name="text">
          <TextArea name="text" placeholder="Esse post fala sobre..." />
        </FormField>
        <TupleFieldContainer>
          <HalfFieldContainer>
            <FormField label="Postada em" name="postedAt">
              <DateInput
                name="postedAt"
                format="dd/mm/yyyy"
                placeholder="dd/mm/aaaa"
              />
            </FormField>
          </HalfFieldContainer>
          <HalfFieldContainer>
            <FormField label="Pessoas alcançadas" name="peopleReached">
              <TextInput name="peopleReached" type="number" placeholder="500" />
            </FormField>
          </HalfFieldContainer>
        </TupleFieldContainer>
        <FilesLabel>Arquivos</FilesLabel>
        <FileInput
          name="multiple_files"
          onChange={(event) => {
            const fileList = event.target.files;
            if (fileList) {
              addFiles(fileList as any)
                .then((res) =>
                  setFileNames(res.images.map((file) => file.filename))
                )
                .catch(() =>
                  errorToast(
                    "Ops, ocorreu um erro ao enviar o arquivo. Tente novamente."
                  )
                );
            }
          }}
          multiple
          messages={{
            browse: "escolha do dispositivo",
            dropPromptMultiple: "Arraste até 10 imagens para cá ou",
            files: "arquivos",
            remove: "remover",
            removeAll: "remover todos",
          }}
        />
      </Form>
    </Modal>
  );
};

export default EditCreatePostModal;
