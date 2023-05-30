import { Heading, Card, CardBody, Box, Button } from '@chakra-ui/react';

const QuestionReplies = ({
  MBMessages,
  session,
  updateMBMessage,
  deleteMBMessage,
}) => (
  <>
    <Heading my={4} size="lg">
      Answers ({MBMessages.length})
    </Heading>

    {MBMessages.map((MBMessage, index) => {
      const messageCreatedByMe = MBMessage.user_id === session?.user?.id;

      return (
        <Card mb={4} key={index}>
          <CardBody>
            <span>{MBMessage.body}</span>

            {messageCreatedByMe && (
              <Box mt={4}>
                <Button
                  colorScheme="facebook"
                  size="sm"
                  onClick={() => updateMBMessage(MBMessage)}
                >
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  ml={3}
                  onClick={() => {
                    deleteMBMessage(MBMessage.id);
                  }}
                  size="sm"
                >
                  Remove
                </Button>
              </Box>
            )}
          </CardBody>
        </Card>
      );
    })}
  </>
);

export default QuestionReplies;
