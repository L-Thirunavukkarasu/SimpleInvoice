//import liraries
import React, {memo} from 'react';
import styled from 'styled-components';


// create a component
const RenderTxtView = ({keyVal, value}) => {
  return (
    <RenderTxtViewParent key={keyVal}>
      {value ? (
        <RenderTxtParent key={keyVal}>
          <ListItemTxt flexVal={0.7}>{keyVal}</ListItemTxt>
          <ListItemTxt flexVal={0.3}>{' : '}</ListItemTxt>
          <ListItemTxt flexVal={1}>{value}</ListItemTxt>
        </RenderTxtParent>
      ) : null}
    </RenderTxtViewParent>
  );
};

//styles
const ListItemTxt = styled.Text`
  font_size: 20px;
  margin_vertical: 3px;
  flex:${props => props?.flexVal};
  text_align:${props => props?.flexVal == 0.3 ? 'center' : 'left'}
`;

const RenderTxtViewParent = styled.View``;

const RenderTxtParent = styled.View`
  flex_direction: row;
  align_items:center;
  margin_vertical:3px;
`;

//make this component available to the app
export default memo(RenderTxtView);
