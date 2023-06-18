import { parseSearchParams } from 'helpers/functions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { RootState } from 'store';
import {
  deleteUnit,
  getUnit,
  updateUnit,
} from 'store/slices/unitSlice';
import { TUnit } from 'types/unit';
const useService = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const urlQueryParams = parseSearchParams(location.search);
  const unitState = useSelector((state: RootState) => state.unit);
  const handleDeleteUnit = (id: number) => {
    dispatch(deleteUnit(id) as any);
  };

  useEffect(() => {
    dispatch(getUnit(urlQueryParams) as any);
  }, []);
  const handleUpdateUnit = (data: TUnit) => {
    dispatch(updateUnit({ id, ...data }) as any);
  };
  return {
    unitState,
    handleUpdateUnit,
    handleDeleteUnit,
  };
};

export default useService;
