import React from 'react';
import { FAB, Portal, useTheme } from 'react-native-paper';

interface FabPersoProps {
  showEmailModal: () => void;
  showEditClientModal: () => void;
  showAddClientModal: () => void;
}

const FabPerso: React.FC<FabPersoProps> = ({
  showEmailModal,
  showEditClientModal,
  showAddClientModal
}) => {
  const [state, setState] = React.useState({ open: false });
  const theme = useTheme();

  const onStateChange = ({ open }: { open: boolean }) => setState({ open });
  const { open } = state;
  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        icon={open ? 'account' : 'plus'}
        color={"white"}
        actions={[
          { icon: 'file-send', label: 'Formulaire satisfaction', onPress: showEmailModal, color: theme.colors.primary },
          { icon: 'account-edit', label: 'Editer client', onPress: showEditClientModal, color: theme.colors.primary },
          { icon: 'account-plus', label: 'Ajouter client', onPress: showAddClientModal, color: theme.colors.primary },
        ]}
        onStateChange={onStateChange}
        fabStyle={{ backgroundColor: '#1e40af' }}
      />
    </Portal>
  );
};

export default FabPerso;
