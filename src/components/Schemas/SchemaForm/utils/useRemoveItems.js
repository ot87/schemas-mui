import { useState } from 'react';

const useRemoveItems = () => {
    const [isRemoveClicked, setIsRemoveClicked] = useState(false);
    const [itemsIdsToRemove, setItemsIdsToRemove] = useState([]);
    const [isRemoveAllClicked, setIsRemoveAllClicked] = useState(false);

    const removeOnClick = removeBatch => {
        if (isRemoveClicked && itemsIdsToRemove.length) {
            removeBatch('items', itemsIdsToRemove);
            setItemsIdsToRemove([]);
            setIsRemoveAllClicked(false);
        }
        setIsRemoveClicked(!isRemoveClicked);
    };

    const removeAllOnClick = items => {
        if (isRemoveAllClicked) {
            setItemsIdsToRemove([]);
        } else {
            setItemsIdsToRemove([...items.keys()]);
        }
        setIsRemoveAllClicked(!isRemoveAllClicked);
    };

    const onItemsRowClick = items => index => {
        if (isRemoveClicked) {
            let newItemsIdsToRemove = [...itemsIdsToRemove];

            if (itemsIdsToRemove.indexOf(index) !== -1) {
                newItemsIdsToRemove = itemsIdsToRemove.filter((id) => id !== index);
            } else {
                newItemsIdsToRemove = itemsIdsToRemove.concat(index);
            }

            setItemsIdsToRemove(newItemsIdsToRemove);
            setIsRemoveAllClicked(items.length === newItemsIdsToRemove.length);
        }
    };

    return [
        { isRemoveClicked, isRemoveAllClicked, itemsIdsToRemove },
        { removeOnClick, removeAllOnClick, onItemsRowClick }
    ];
};

export default useRemoveItems;
