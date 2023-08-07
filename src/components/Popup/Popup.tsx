import { Flex, Text, Image, Tooltip, useToast, Box } from "@chakra-ui/react";
import { CategoryData } from "../../utils/Category";
import ImagePreview from "../ImagePreview/ImagePreview";
import { EditIcon } from "@chakra-ui/icons";
import calendar from "../../assets/calendar.png";
import document from "../../assets/document.png";
import share from "../../assets/share.png";
import { formatStartDate, formatEndDate } from "../../helpers/formatDate";

interface Popup {
  popupData: __esri.ViewHit[];
  auth: any;
}

const shareUrl = window.location.origin;

export default function Popup({ popupData, auth }: Popup) {
  const toast = useToast();

  return popupData?.map((item: any) => {
    const startDate = new Date(
      item.graphic.attributes.RENGINIO_PRADZIA
    ).toLocaleString("lt-LT", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const endDate = new Date(
      item.graphic.attributes.RENGINIO_PABAIGA
    ).toLocaleString("lt-LT", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <Flex
        key={item.graphic.attributes.OBJECTID}
        flexDirection={"column"}
        bg="brand.white"
        mb="2"
        shadow="md"
        p={{ base: "2", md: "3" }}
        borderRadius="md"
        w="100%"
        position="relative"
      >
        {auth.user.token && (
          <Tooltip label="Redaguoti" fontSize="xs">
            <EditIcon
              position="absolute"
              boxSize="5"
              top="1"
              left="1"
              _hover={{ cursor: "pointer" }}
              // onClick={() => console.log("item", item)}
            />
          </Tooltip>
        )}
        <Tooltip label="Dalintis" fontSize="xs">
          <Image
            src={share}
            boxSize={{ base: "4", md: "5" }}
            position="absolute"
            top="1"
            right="1"
            _hover={{ cursor: "pointer" }}
            onClick={() => {
              navigator.clipboard.writeText(
                `${shareUrl}?objectid=${item.graphic.attributes.OBJECTID}&pradzia=${item.graphic.attributes.RENGINIO_PRADZIA}&pabaiga=${item.graphic.attributes.RENGINIO_PABAIGA}`
              );
              toast({
                title: "Renginio nuoroda nukopijuota",
                position: "top",
                status: "success",
                duration: 2000,
              });
            }}
          />
        </Tooltip>
        {CategoryData.map((category) => {
          if (category.value === item.graphic.attributes.KATEGORIJA) {
            return (
              <Flex
                justify="center"
                key={category.id}
                // w={{
                //   base: popupData.length > 1 ? "calc(100%-40px)" : "100%",
                //   md: "auto",
                // }}
              >
                <Flex
                  justify="center"
                  bg={category.color}
                  align="center"
                  px="2"
                  py="0.5"
                  borderRadius="md"
                  color="brand.white"
                >
                  <Image src={category.icon} mr="1" boxSize="6" />
                  <Text
                    fontWeight="500"
                    letterSpacing="0.8px"
                    fontSize="xs"
                    textTransform="uppercase"
                  >
                    {category.text}
                  </Text>
                </Flex>
              </Flex>
            );
          }
        })}

        <Text fontWeight="500" py="2" px="2" textAlign="center">
          {item.graphic.attributes.PAVADINIMAS}
        </Text>

        <Flex align="center" mb="2">
          <Image
            src={calendar}
            alt="calendar"
            boxSize={{ base: "4", md: "5" }}
            mr="3"
          />
          <Box fontSize="sm" color="gray.600" fontWeight="500" lineHeight="1.2">
            <Text>
              {item.graphic.attributes.ILGALAIKIS === 1
                ? formatStartDate(startDate, endDate)
                : startDate}
            </Text>
            <Text>
              {item.graphic.attributes.ILGALAIKIS === 1
                ? formatEndDate(startDate, endDate)
                : endDate}
            </Text>
          </Box>
        </Flex>
        <Flex align="center" mb={{ base: "1", md: "2" }} fontSize="sm">
          <Image
            src={document}
            alt="document"
            mr="3"
            boxSize={{ base: "4", md: "5" }}
          />
          <Text lineHeight="1.3">{item.graphic.attributes.ORGANIZATORIUS}</Text>
        </Flex>
        <Text fontSize="sm" mb="1">
          {item.graphic.attributes.APRASYMAS}
        </Text>
        {item.graphic.attributes.PASTABOS && (
          <Text fontSize="sm">Gauta: {item.graphic.attributes.PASTABOS}</Text>
        )}
        <Text>{item.graphic.attributes.WEBSITE}</Text>
        {auth.user.token && item.graphic.attributes.PAPILD_INF && (
          <Text color="green" fontSize="sm">
            * {item.graphic.attributes.PAPILD_INF}
          </Text>
        )}
        <Flex
          flexDirection="row"
          w="100%"
          flexWrap="wrap"
          mt="2"
          justifyContent="flex-start"
          gap="2"
        >
          {item.graphic.attachments &&
            item.graphic.attachments.map(
              (att: __esri.AttachmentInfo, index: number) => (
                <ImagePreview
                  key={index}
                  url={att.url}
                  type={att.contentType}
                />
              )
            )}
        </Flex>
      </Flex>
    );
  });
}
