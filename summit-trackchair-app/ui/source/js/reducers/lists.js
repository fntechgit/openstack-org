/*eslint-disable */

export const lists = function (
    state = {
        results: null,        
        loading: false,
        showDrawer: false,
		acceptedCount: 0,
		alternateCount: 0
    },
    action = {}) {	

    switch(action.type) {
        case 'REQUEST_LISTS':
            return {
                ...state,
                loading: true
            };
        case 'RECEIVE_LISTS':
        	return {
                ...state,
                results: [
                	...action.payload.response.lists
                			.sort((a,b) => {
                                return !a.is_group;
                            })
                ],
				acceptedCount: action.payload.response.accepted_count,
				alternateCount:action.payload.response.alternate_count,
                loading: false
            };

        case 'REORGANISE_SELECTIONS': {

        	if(!action.payload.collection) {
        		throw new Error('REORGANISE_SELECTIONS must have "collection" in the payload');        		
        	}

			const {collection} = action.payload;
			let newResults;
			const organisedSelections = action.payload.newOrder.map((s,i) => (
				{...s, order: i+1}
			));

			if(collection === 'team') {
				newResults = state.results.map(list => {
					if(list.is_group) {
						return {
							...list,
							selections: organisedSelections
						}
					}
					return list;
				})
				
			}
			else {
				newResults = state.results.map(list => {
					if(list.id == action.payload.listID) { 
						return {
							...list,
							[collection]: organisedSelections
						}
					}
					return list;
				})
			}

        	return {
        		...state,
				results: newResults
        	};
        }

        case 'TOGGLE_FOR_ME':
        	const {presentationID, type, name} = action.payload;
        	const list = state.results.find(l => l.mine);

        	if(!list) {
        		throw new Error('Tried to add a presentation when your category is not selected');
        	}

        	return {
        		...state,
        		results: state.results.map(l => {
        			if(l.mine) {
        				const newList = {
        					...l,
        					selections: l.selections.filter(s => +s.id !== +presentationID),
        					maybes: l.maybes.filter(s => +s.id !== +presentationID)
        				};

        				if(type === 'selected') {
        					newList.selections.push({
        						id: presentationID,
        						presentation: {
        							title: null,
        							id: null,
        							selectors: [],
        							likers: [],
        							passers: []
        						},
        						order: newList.selections.length+2
        					});
        				}
        				else if(type === 'maybe') {
        					newList.maybes.push({
        						id: presentationID,
        						presentation: {
        							title: null,
        							id: null,
        							selectors: [],
        							likers: [],
        							passers: []        							
        						},        						
        						order: newList.maybes.length+2
        					});        					
        				}

        				return newList;
        			}

        			return l;
        		})
        	};
        case 'SUCCESS_REORDER_CHANGE':
            return {
                ...state,
                results: state.results.map(list => {
                    if(list.id == action.payload.listID) {
                        return {
                            ...list,
                            list_hash: action.payload.response.new_hash
                        }
                    }
                    return list;
                })
            };
        default:
            return state;

    }
};
/*eslint-enable */
