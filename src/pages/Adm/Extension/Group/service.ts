import { parseSearchParams } from 'helpers/functions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { RootState } from 'store';
import {
  deleteGroup,
  getGroup,
  updateGroup,
} from 'store/slices/groupSlice';
import { TGroup } from 'types/group';
const useService = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const urlQueryParams = parseSearchParams(location.search);
  const groupState = useSelector((state: RootState) => state.group);
  const handleDeleteGroup = (id: number) => {
    dispatch(deleteGroup(id) as any);
  };
  useEffect(() => {
    dispatch(getGroup(urlQueryParams) as any);
  }, []);
  const handleUpdateGroup = (data: TGroup) => {
    dispatch(updateGroup({ id, ...data }) as any);
  };
  return {
    groupState,
    handleDeleteGroup,
    handleUpdateGroup,
  };
};
export default useService;
