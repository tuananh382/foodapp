import React from 'react';
import { View, Text } from 'react-native';
//import MapView, { Marker } from 'react-native-maps';
import { Order } from '../types';

interface TrackingMapProps {
  order: Order;
  region: { latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number };
}

export default function TrackingMap({ order, region }: TrackingMapProps) {
  return (
    <View style={{ flex: 1, marginTop: 10 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginVertical: 8 }}>Theo dõi đơn hàng trên bản đồ</Text>
      {/* <MapView
        style={{ flex: 1, minHeight: 200 }}
        region={region}
        showsUserLocation={true}
      >
        <Marker
          coordinate={{
            latitude: order.location.lat,
            longitude: order.location.lng,
          }}
          title="Vị trí đơn hàng"
        />
      </MapView> */}
    </View>
  );
}
