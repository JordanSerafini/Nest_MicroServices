import * as React from 'react';
import { Button, Dialog, Portal } from 'react-native-paper';

interface DialogPersoProps {
  visible: boolean;
  hideDialog: () => void;
}

const DialogPerso: React.FC<DialogPersoProps> = ({ visible, hideDialog }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Actions>
          <Button onPress={() => console.log('Cancel')}>Cancel</Button>
          <Button onPress={() => console.log('Ok')}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogPerso;
