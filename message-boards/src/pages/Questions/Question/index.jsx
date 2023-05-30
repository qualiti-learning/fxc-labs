import { useContext } from 'react';
import { Box, Divider } from '@chakra-ui/react';
import { useOutletContext } from 'react-router-dom';

import { AppContext } from '../../../context/AppContext';
import { useMessages } from '../../../hooks/useMessage';
import QuestionHeadline from './components/QuestionHeadline';
import QuestionReplies from './components/QuestionReplies';
import QuestionReply from './components/QuestionReply';

export default function Question() {
  const { session } = useContext(AppContext);
  const { MBThread } = useOutletContext();
  const { MBMessages, addMBMessage, updateMBMessage, deleteMBMessage } =
    useMessages(MBThread?.id);

  return (
    <Box>
      <QuestionHeadline MBThread={MBThread} />

      <Divider my={4} />

      <QuestionReplies
        deleteMBMessage={deleteMBMessage}
        MBMessages={MBMessages}
        session={session}
        updateMBMessage={updateMBMessage}
      />

      {session && <QuestionReply addMBMessage={addMBMessage} />}
    </Box>
  );
}
