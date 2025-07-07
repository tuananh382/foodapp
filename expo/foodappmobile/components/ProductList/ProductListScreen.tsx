import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CartItem, Category, Product } from '../../types';
import ProductCard from '../ProductCard/ProductCard';
import styles from './styles';

interface ProductListScreenProps {
    products: Product[];
    categories: Category[];
    onAddToCart: (item: CartItem) => void;
}

export default function ProductListScreen({ products, categories, onAddToCart }: ProductListScreenProps) {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

    // Filter products based on search query and selected category
    useEffect(() => {
        let filtered = products;

        if (searchQuery) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        if (selectedCategory) {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        setFilteredProducts(filtered);
    }, [searchQuery, selectedCategory, products]);

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Thực đơn</Text>
                <TouchableOpacity style={styles.cartButton} onPress={() => router.push('/(tabs)/cart')}>
                    <Text style={styles.cartButtonText}>🛒</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm món ăn..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor="#999"
                />
            </View>

            <View style={styles.categoryContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryScrollContent}
                >
                    <TouchableOpacity
                        style={[
                            styles.categoryItem,
                            selectedCategory === null && styles.categoryItemActive
                        ]}
                        onPress={() => setSelectedCategory(null)}
                    >
                        <Text
                            style={[
                                styles.categoryText,
                                selectedCategory === null && styles.categoryTextActive
                            ]}
                        >
                            Tất cả
                        </Text>
                    </TouchableOpacity>

                    {categories.map(category => (
                        <TouchableOpacity
                            key={category._id}
                            style={[
                                styles.categoryItem,
                                selectedCategory === category.name && styles.categoryItemActive
                            ]}
                            onPress={() => setSelectedCategory(category.name)}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    selectedCategory === category.name && styles.categoryTextActive
                                ]}
                            >
                                {category.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {filteredProducts.length > 0 ? (
                <FlatList
                    data={filteredProducts}
                    keyExtractor={(item) => item._id}
                    numColumns={2}
                    contentContainerStyle={styles.productListContent}
                    columnWrapperStyle={styles.productRow}
                    renderItem={({ item }) => (
                        <View style={styles.productCardContainer}>
                            <ProductCard
                                product={item}
                                onPress={() =>
                                    router.push({
                                        pathname: '/(tabs)/product/[id]',
                                        params: {
                                            id: item._id,
                                            product: JSON.stringify(item),
                                        },
                                    })
                                }
                                onAddToCart={() =>
                                    onAddToCart({
                                        productId: item._id,
                                        name: item.name,
                                        price: item.price,
                                        image: item.image,
                                        quantity: 1,
                                    })
                                }
                            />
                        </View>
                    )}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    {/* <ExpoImage
                        source={require('../../assets/images/empty-search.png')}
                        style={styles.emptyImage}
                        contentFit="contain"
                    /> */}
                    <Text style={styles.emptyText}>Không tìm thấy món ăn</Text>
                    {searchQuery ? (
                        <TouchableOpacity
                            style={styles.resetButton}
                            onPress={() => {
                                setSearchQuery('');
                                setSelectedCategory(null);
                            }}
                        >
                            <Text style={styles.resetButtonText}>Xem tất cả món ăn</Text>
                        </TouchableOpacity>
                    ) : null}
                </View>
            )}
        </View>
    );
}