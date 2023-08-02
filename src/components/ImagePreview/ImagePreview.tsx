import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Flex,
  Button,
} from "@chakra-ui/react";
import { Document, Page, pdfjs, Thumbnail } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

type ImagePreviewProps = {
  url: string;
  type: string;
};

export default function ImagePreview({ url, type }: ImagePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const goToPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };
  const goToNextPage = () => {
    if (!numPages) return;
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handleImageClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Flex
        w="30%"
        onClick={handleImageClick}
        justifyContent="flex-start"
        _hover={{ cursor: "pointer" }}
      >
        {type !== "application/pdf" && (
          <Image src={url} alt="Preview" objectFit={"cover"} />
        )}
        {type === "application/pdf" && (
          <Document file={url} loading="Kraunasi....">
            <Thumbnail pageNumber={1} width={100} />
          </Document>
        )}
      </Flex>
      <Modal isOpen={isOpen} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent minWidth="fit-content" height="fit-content">
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {type !== "application/pdf" && <Image src={url} alt="Preview" />}
            {type === "application/pdf" && (
              <>
                <Document
                  file={url}
                  loading="Kraunasi...."
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page pageNumber={pageNumber} scale={1.6} />
                </Document>
                <p>
                  Puslapis {pageNumber} iš {numPages}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  mr="1"
                  onClick={goToPrevPage}
                >
                  Ankstesnis
                </Button>
                <Button size="sm" variant="outline" onClick={goToNextPage}>
                  Sekantis
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
