import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import { StockDocument } from '../../../@types/item.type';
import { router } from 'expo-router';

interface TableProps {
    tableHead?: string[]
    Data?: StockDocument[]
    colWidth?: string[]
    columnTitle?: string[]
    onEndReached?: () => void;
}

function Table({ tableHead, Data, colWidth, columnTitle, onEndReached }: TableProps) {

    const defaultColumnTitle = ['Document Number', 'Document Date', 'Dépot', 'Info'];
    const defaultColumnWidths = ['w-3/10', 'w-3/10', 'w-3/10', 'w-1/10'];

    const [columnWidths, setColumnWidths] = useState(defaultColumnWidths);
    const [columnTitles, setColumnTitles] = useState(defaultColumnTitle);
    // const [storehouseNames, setStorehouseNames] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (colWidth) {
            setColumnWidths(colWidth);
        }
        if (columnTitle) {
            setColumnTitles(columnTitle);
        }
    }, [colWidth, columnTitle]);



    const getStorehouseName = (id: string) => {
        switch (id) {
            case '3b7fa0c3-1f64-449f-9277-cb8d8ccb9663':
                return 'Principal';
            case '105f5db2-e1b0-46e7-a6dd-c3c6516c746f':
                return 'Stock voiture technique';
            default:
                return 'Inconnue';
        }
    };

    const handleIconPress = (Id: string) => {
        router.push({
            pathname: "/items/stockDocumentDetail",
            params: { DocumentId : Id },
          });    };

    const renderItem = ({ item }: { item: StockDocument }) => (
        <View className='flex-row bg-white py-4 border-b border-gray-500'>
            <View className={`${columnWidths[0]} max-h-14`}>
                <Text className='text-center'>{item.NumberSuffix}</Text>
            </View>
            <View className={`${columnWidths[1]} max-h-14`}>
                <Text className='text-center'>{new Date(item.DocumentDate).toLocaleDateString()}</Text>
            </View>
            <View className={`${columnWidths[2]} max-h-14`}>
                <Text className='text-center text-xs'>{getStorehouseName(item.StorehouseId)}</Text>
            </View>
            <View className={`${columnWidths[3]} flex items-center justify-center`}>
                <TouchableOpacity onPress={() => handleIconPress(item.Id)} className='bg-blue-800 rounded-full'>
                    <Icon name="infocirlceo" size={18} color="white" style={{ textAlign: 'center' }} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View className='w-full'>
            {/* ----------------------------------------------------------------------------------------- Table Header ----------------------------------------------------------------------------- */}
            <View className='flex-row bg-white-perso rounded-t-xl py-2'>
                {columnTitles.map((item, index) => (
                    <View key={index} className={columnWidths[index]}>
                        <Text className='font-bold text-center text-blue-800'>{item}</Text>
                    </View>
                ))}
            </View>
            {/* ----------------------------------------------------------------------------------------- Table Data ----------------------------------------------------------------------------- */}
            <FlatList
                className='max-h-8.5/10'
                data={Data}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.Id.toString() + index}
                ListEmptyComponent={<Text className='text-center'>No data available</Text>}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5} 
            />
        </View>
    )
}

export default Table;
