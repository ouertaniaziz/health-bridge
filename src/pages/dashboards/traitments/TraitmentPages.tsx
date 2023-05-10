import React, { useState } from 'react';
import { Button, Popconfirm } from 'antd';

import TraitementTable from '../../../layout/components/traitments/traitmentsTable';
import PageAction from '../../../layout/components/page-action/PageAction';
import { useFetchPageData, usePageData } from '../../../hooks/usePage';
import { ITraitement } from '../../../interfaces/traitement';
import { IPageData } from '../../../interfaces/page';

const pageData: IPageData = {
  title: 'Traitement',
  fulFilled: false,
  breadcrumbs: [
    {
      title: 'Polyclinic',
      route: 'default-dashboard'
    },
    {
      title: 'Traitement'
    }
  ]
};

const TraitementPage = () => {
  const [traitements, setTraitements] = useFetchPageData<ITraitement[]>('./medications', []);
  const [deletingTraitement, setDeletingTraitement] = useState<ITraitement | null>(null);

  const handleDelete = async (traitement: ITraitement) => {
    try {
      await fetch(`/api/medications/${traitement.medicationName}`, {
        method: 'DELETE'
      });
      setTraitements(traitements.filter((t) => t.medicationName !== traitement.medicationName));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelDelete = () => {
    setDeletingTraitement(null);
  };

  const handleConfirmDelete = () => {
    if (deletingTraitement) {
      handleDelete(deletingTraitement);
      setDeletingTraitement(null);
    }
  };

  const traitementsActions = (traitement: ITraitement) => (
    <div className='buttons-list nowrap'>
      <Popconfirm
        title='Are you sure you want to delete this traitement?'
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        visible={
          !!deletingTraitement && deletingTraitement.medicationName === traitement.medicationName
        }
      >
        <Button
          onClick={() => {
            setDeletingTraitement(traitement);
          }}
          shape='circle'
          danger
        >
          <span className='icofont icofont-ui-delete' />
        </Button>
      </Popconfirm>
    </div>
  );

  usePageData(pageData);

  return (
    <>
      <TraitementTable data={traitements} actions={traitementsActions} />

      <PageAction
        icon='icofont-pills'
        type={'primary'}
        onClick={() => {
          // add code for adding a new traitement here
        }}
      />

      <Popconfirm
        title='Are you sure you want to delete this traitement?'
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        visible={!!deletingTraitement}
      ></Popconfirm>
    </>
  );
};

export default TraitementPage;
