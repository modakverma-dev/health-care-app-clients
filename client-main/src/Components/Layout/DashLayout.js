import React, { Fragment, useCallback } from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';

import NavLogo from '../NavLogo';
import { color } from '../../Theme/color';

const DashLayout = ({
  fetchData,
  loading,
  children,
  statusBgColor = color.background,
  barStyle = 'dark-content',
  bgColor = color.background,
}) => {
  const onRefresh = useCallback(() => {
    if (fetchData) {
      fetchData();
    }
  }, []);

  return (
    <Fragment>
      <StatusBar backgroundColor={statusBgColor} barStyle={barStyle} />
      <SafeAreaView style={{ flex: 0, backgroundColor: statusBgColor }} />
      <NavLogo />
      <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }>
          {children}
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

export default DashLayout;
