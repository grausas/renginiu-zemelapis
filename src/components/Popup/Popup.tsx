import { Flex, Text, Image, Tooltip, useToast, Box } from "@chakra-ui/react";
import { CategoryData } from "../../utils/Category";
import ImagePreview from "../ImagePreview/ImagePreview";
import { ExternalLinkIcon, EditIcon } from "@chakra-ui/icons";
import calendar from "../../assets/calendar.png";
import document from "../../assets/document.png";

interface Popup {
  popupData: __esri.ViewHit[];
  auth: any;
}

const shareUrl = window.location.href;

export default function Popup({ popupData, auth }: Popup) {
  const toast = useToast();

  console.log("popupData", popupData);
  return popupData?.map((item: any) => (
    <Flex
      key={item.graphic.attributes.OBJECTID}
      flexDirection={"column"}
      bg="brand.white"
      mb="2"
      mr={{ base: "2", md: "0" }}
      shadow="md"
      p="3"
      borderRadius="md"
      w={{
        base: popupData.length > 1 ? "calc(100%-40px)" : "100vw",
        md: "auto",
      }}
      position="relative"
    >
      {auth && (
        <Tooltip label="Redaguoti" fontSize="xs">
          <EditIcon
            position="absolute"
            top="2"
            left="2"
            _hover={{ cursor: "pointer" }}
            onClick={() => console.log("item", item)}
          />
        </Tooltip>
      )}
      <Tooltip label="Dalintis" fontSize="xs">
        <ExternalLinkIcon
          position="absolute"
          top="2"
          right="2"
          _hover={{ cursor: "pointer" }}
          onClick={() => {
            navigator.clipboard.writeText(
              `${shareUrl}?objectid=${item.graphic.attributes.OBJECTID} `
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
              w={{
                base: popupData.length > 1 ? "calc(100%-40px)" : "100vw",
                md: "auto",
              }}
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

      <Text fontWeight="500" my="2" textAlign="center">
        {console.log("item", item)}
        {item.graphic.attributes.PAVADINIMAS}
      </Text>

      <Flex align="center" mb="2" fontSize="sm">
        <Image src={calendar} alt="calendar" boxSize="5" mr="3" />
        <Box>
          <Text>
            {new Date(item.graphic.attributes.RENGINIO_PRADZIA).toLocaleString(
              "lt-LT"
            )}
          </Text>
          <Text>
            {new Date(item.graphic.attributes.RENGINIO_PABAIGA).toLocaleString(
              "lt-LT"
            )}{" "}
          </Text>
        </Box>
      </Flex>
      <Flex align="center" mb="1" fontSize="sm">
        <Image src={document} alt="document" mr="3" boxSize="5" />
        <Text lineHeight="1.3">{item.graphic.attributes.ORGANIZATORIUS}</Text>
      </Flex>
      <Text fontSize="sm" mb="1">
        {item.graphic.attributes.APRASYMAS}
      </Text>
      {item.graphic.attributes.PASTABOS && (
        <Text fontSize="sm">Gauta: {item.graphic.attributes.PASTABOS}</Text>
      )}
      <Text>{item.graphic.attributes.WEBSITE}</Text>
      {auth.user.token && <Text>{item.graphic.attributes.PAPILD_INF}</Text>}
      <Flex
        flexDirection="row"
        w="100%"
        flexWrap="wrap"
        mt="2"
        justifyContent="space-between"
      >
        {item.graphic.attachments &&
          item.graphic.attachments.map((att: any, index: number) => (
            <ImagePreview key={index} url={att.url} />
          ))}
      </Flex>
    </Flex>
  ));
}
