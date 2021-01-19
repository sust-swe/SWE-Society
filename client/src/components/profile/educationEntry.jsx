import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const EducationEntry = ({
  institute,
  degree,
  subject,
  description,
  location,
  website_link,
}) => {
  console.log(institute, degree, subject, description, location, website_link);
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
        <Text fontSize="sm">{`${degree} on ${subject}`}</Text>
      )) ||
        (subject && <Text fontSize="sm">{subject}</Text>)}
      {description && (
        <Text borderLeft="2px solid #aaa" px={2} py={1} my={1} color="gray.600">
          {description}
        </Text>
      )}
    </Box>
  );
};

export default EducationEntry;
