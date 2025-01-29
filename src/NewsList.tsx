import { Box, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import useNewsData from "./hooks/useNewsData";
import useNewsApi from "./hooks/useNewApi";

const NewsList = () => {
  const {
    data: newsData,
    error: errorNewsData,
    isLoading: isLoadingNewsData,
  } = useNewsData();
  const {
    data: newsApi,
    error: errorNewsApi,
    isLoading: isLoadingNewsApi,
  } = useNewsApi();

  if (isLoadingNewsApi) return <p>Loading...</p>;
  if (isLoadingNewsData) return <p>Loading...</p>;
  if (errorNewsApi && !newsApi) return <p>{errorNewsApi.message}</p>;
  if (errorNewsData && !newsData) return <p>{errorNewsData.message}</p>;

  return (
    <>
      <Heading>Latest news</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} padding="10px">
        {newsData?.results
          ?.filter((article) => article.language === "english")
          .map((article) => (
            <Box key={article.article_id}>
              <Heading as="h2" fontSize="xl" color="gray.100" padding={2}>
                {article.title}
              </Heading>
              <Image src={article?.image_url} width="300px" padding={2} />
              <Text>{article.description}</Text>
            </Box>
          ))}
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} padding="10px">
        {newsApi?.articles?.map((article) => (
          <Box key={article.source.id}>
            <Heading as="h2" fontSize="xl" color="gray.100" padding={2}>
              {article.title}
            </Heading>
            <Image src={article?.urlToImage} width="300px" padding={2} />
            <Text>{article.description}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};

export default NewsList;
