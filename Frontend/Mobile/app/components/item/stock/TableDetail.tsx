import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { StockDocumentLine } from '../../../@types/item.type';

interface TableProps {
    tableHead: string[];
    DataLine?: StockDocumentLine[];
}

const TableDetail: React.FC<TableProps> = ({ tableHead, DataLine }) => {
    if (!DataLine || !Array.isArray(DataLine)) {
        return <Text>Loading...</Text>;
    }

    const colWidht = ['w-6/10', 'w-2/10', 'w-2/10'];

    return (
        <View className='w-full h-7.5/10 '>
            {/* Table Header */}
            <View className='flex-row bg-white-perso rounded-t-xl py-2'>
                {tableHead.map((head, index) => (
                    <View key={index} className={`${colWidht[index]}`}>
                        <Text className='font-bold text-center text-blue-800'>{head}</Text>
                    </View>
                ))}
            </View>
            {/* Table Rows */}
            <FlatList
                data={DataLine}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View className='flex-row bg-white py-4 border-b border-gray-500 items-center'>
                        <View className='w-6/10 max-h-14 min-h-full border-gray-700  border-r '>
                            <Text className='text-center text-xs px-2'>{item.Caption}</Text>
                        </View>
                        <View className='w-2/10 max-h-14 min-h-full border-r border-gray-700'>
                            <Text className='text-center text-xs'>{item.Quantity}</Text>
                        </View>
                        <View className='w-2/10 max-h-14'>
                            <Text className='text-center text-xs'>{item.SalePriceVatExcluded}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default TableDetail;
