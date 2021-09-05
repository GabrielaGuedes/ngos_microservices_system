import {
  DateInput,
  FileInput,
  Form,
  FormField,
  TextArea,
  TextInput,
} from "grommet";
import React, { useState } from "react";
import { ReactElement } from "react";
import { useEffect } from "react";
import { addFiles } from "../../requests/marketing/add-files";
import { createPost } from "../../requests/marketing/create-post";
import { getFile } from "../../requests/marketing/get-file";
import { removeFiles } from "../../requests/marketing/remove-files";
import { INewPost, IPost } from "../../requests/marketing/types";
import { updatePost } from "../../requests/marketing/update-post";
import {
  HalfFieldContainer,
  TupleFieldContainer,
} from "../../ui-components/base-containers/base-containers";
import Button from "../../ui-components/button/button";
import Modal from "../../ui-components/modal/modal";
import {
  errorToast,
  loadingToast,
  successToast,
} from "../../ui-components/toasts/toasts";
import { SPACES } from "../../ui-constants/sizes";
import { cleanEmptyEntries } from "../../utils/empty-entries-cleaner";
import {
  FileContainer,
  Files,
  FilesLabel,
} from "./edit-create-post-modal.style";

interface IImagesElement {
  path: string;
  element: ReactElement;
}

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
  const [imagesElements, setImagesElements] = useState<IImagesElement[]>([]);

  useEffect(() => {
    const images: IImagesElement[] = [];
    data?.files.forEach((file) => {
      return getFile(file.path)
        .then((fileLoaded) =>
          fileLoaded.blob().then((blob: any) => {
            const objectUrl = URL.createObjectURL(blob);
            const element = (
              <FileContainer key={`container-${file.id}`}>
                <img
                  key={`img-${file.id}`}
                  src={objectUrl}
                  width={100}
                  alt="post"
                  style={{ marginBottom: SPACES.px4 }}
                />
                <Button
                  key={`remove-button-${file.id}`}
                  kind="text"
                  color="danger"
                  onClick={() => {
                    data.files = data.files.filter((f) => f.path !== file.path);
                    updatePost(formattedFormValues() as INewPost, data.id)
                      .then(() =>
                        removeFiles({ paths: ["public-files/" + file.path] })
                          .then(() => {
                            refreshData();
                          })
                          .catch(() => {})
                      )
                      .catch(() => errorToast());
                  }}
                >
                  Remover
                </Button>
              </FileContainer>
            );

            images.push({ path: file.path, element });
          })
        )
        .catch(() => {});
    });
    setTimeout(() => setImagesElements(images), 500);
  }, [data]);

  const filePaths = () => {
    if (!data) {
      return fileNames || [];
    }
    return (fileNames || []).concat(data.files.map((f) => f.path));
  };

  const formattedFormValues = () => {
    const withDateFormatted = {
      ...formValues,
      postedAt: formValues.postedAt?.substring(0, 10),
      peopleReached:
        formValues.peopleReached && parseInt(formValues.peopleReached),
      filePaths: filePaths(),
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
        <Files>{imagesElements.map((i: any) => i.element)}</Files>
      </Form>
    </Modal>
  );
};

export default EditCreatePostModal;
