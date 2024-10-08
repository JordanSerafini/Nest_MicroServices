import React from 'react';
import { FAB, Portal, useTheme } from 'react-native-paper';

interface FabDealProps {
  showEditSaleModal: () => void;
  showAddSaleModal: () => void;

  showEditDealModal: () => void;
  showAddDealModal: () => void;

  content: string;
}

const FabDeal: React.FC<FabDealProps> = ({
  showEditSaleModal,
  showAddSaleModal,
  showEditDealModal,
  showAddDealModal,
  content,
}) => {
  const [state, setState] = React.useState({ open: false });
  const theme = useTheme();

  const onStateChange = ({ open }: { open: boolean }) => setState({ open });
  const { open } = state;

  const renderActions = () => {
    if (content === 'sales') {
      return [
        { icon: 'account-edit', label: 'Editer vente', onPress: showEditSaleModal, color: '#1e3a8a' },
        { icon: 'account-plus', label: 'Ajouter vente', onPress: showAddSaleModal, color: '#1e3a8a' },
      ];
    } else if (content === 'affaires') {
      return [
        { icon: 'account-edit', label: 'Editer affaire', onPress: showEditDealModal, color: '#1e3a8a' },
        { icon: 'account-plus', label: 'Ajouter affaire', onPress: showAddDealModal, color: '#1e3a8a' },
      ];
    } else {
      return [
        { icon: 'plus', onPress: () => console.log('Another action'), color: '#1e3a8a' },
      ];
    }
  };

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        icon={open ? 'account' : 'plus'}
        color={'white'}
        actions={renderActions()}
        onStateChange={onStateChange}
        fabStyle={{ backgroundColor: '#1e3a8a' }}
      />
    </Portal>
  );
};

export default FabDeal;
