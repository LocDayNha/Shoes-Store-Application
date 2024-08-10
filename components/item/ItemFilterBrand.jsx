import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import {React,useEffect,useState} from 'react'
import { useTheme } from '@react-navigation/native';



const ItemFilterBrand = (props) => {
    const {dulieu,navigation}=props;
    const { colors } = useTheme();
    const [isSelected, setIsSelected] = useState(false);
    const [selectedBrands, setSelectedBrands] = useState(null);
    const [brandIndex, setBrandIndex] = useState(0);
    useEffect(() => {
        console.log(selectedBrands);
    }, [selectedBrands]);
    const handlePress = () => {
        if (selectedBrands === dulieu._id) {
            setSelectedBrands(null);
        } else {
            setSelectedBrands(dulieu._id);
        }


      
      };
    
    return (
        <View>
            <TouchableOpacity
            // key={dulieu._id}

            // onPress={() => setBrandIndex(index)}
                style={{
                    // backgroundColor: colors.card,
                    // paddingHorizontal: 20,
                    // paddingVertical: 12,
                    // borderRadius: 100,
                    // borderWidth: dulieu._id ? 0 : 0,
                    // borderColor: colors.border,
                    // width: "33%",
                    // marginBottom: 5,
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: selectedBrands === dulieu._id ? "blue" : "green",
                    borderRadius:100,
                    width:"100%",
                    paddingVertical:12,
                    marginBottom:5,
                    paddingHorizontal:10,
                    marginLeft:5
                }}
                onPress={handlePress}
            >
                <Text
                    style={{
                        // color: isSelected ? colors.background : colors.text,
                        fontWeight: "500",
                        fontSize: 14,
                        // opacity: isSelected ? 1 : 0.6,
                        textAlign: "center",
                        color:"white"
                    }}
                    numberOfLines={1}
                >
                    {dulieu.name}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ItemFilterBrand

const styles = StyleSheet.create({})