import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const EducationEntry = ({
  institute,
  degree,
  subject,
  description,
  location,
  joining_date,
  leaving_date,
}) => {
  return (
    <Box m={3}>
      <Flex flexWrap="wrap" justifyContent="space-between">
        <Heading size="md">{institute}</Heading>
        {location && (
          <Text fontSize="sm" color="gray.600">
            {location}
          </Text>
        )}
      </Flex>
      {(degree && subject && (
        <Text
          fontSize="sm"
          display="inline"
          mr={2}
        >{`${degree} on ${subject}`}</Text>
      )) ||
        (subject && (
          <Text fontSize="sm" display="inline" mr={2}>
            {subject}
          </Text>
        ))}
      {joining_date && (
        <>
          <Text display="inline">•</Text>
          <Text fontSize="sm" display="inline" ml={2}>
            {new Date(joining_date).getFullYear()} -{" "}
            {leaving_date ? new Date(leaving_date).getFullYear() : "Present"}
          </Text>
        </>
      )}
      {description && (
        <Text borderLeft="2px solid #aaa" px={2} py={1} my={1} color="gray.600">
          {description}
        </Text>
      )}
    </Box>
  );
};

export default EducationEntry;
