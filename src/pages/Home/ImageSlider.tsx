// ImageSlider.tsx
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
} from 'react-native';

const {width} = Dimensions.get('screen');

interface ImageSliderProps {
  images: number[];
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  activeIndex: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  onScroll,
  activeIndex,
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        pagingEnabled
        snapToAlignment="start"
        snapToInterval={width * 0.8} // Mengatur jarak slide
        decelerationRate="fast"
        renderItem={({item}) => <Image source={item} style={styles.image} />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.contentContainer}
      />

      {/* Dot Indicator */}
      <View style={styles.indicatorContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === activeIndex && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Memusatkan slider
  },
  image: {
    width: width * 0.8, // Lebar gambar yang lebih kecil untuk melihat sisi gambar berikutnya
    height: 159, // Menyesuaikan tinggi gambar
    resizeMode: 'cover',
    borderRadius: 10, // Menambahkan radius untuk sudut yang melengkung
    marginHorizontal: 5, // Jarak antar gambar
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#FF8261', // Sesuaikan dengan warna utama aplikasi
    width: 10,
    height: 10,
  },
});

export default ImageSlider;
