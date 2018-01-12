import React from 'react';
import { Table, Image, Icon, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const CardContent = (props) => {
  const content = props.data.length ? (
    <Table singleLine compact>
      <Table.Body>
        { props.data.map((item, index) => {
          const key = index + 1;
          return (
            <Table.Row key={key}>
              <Table.Cell>
                <Image src={item.avatar ? item.avatar : 'https://react.semantic-ui.com/assets/images/wireframe/square-image.png'} avatar />
                <span>{item.name} {item.lastName}</span>
              </Table.Cell>
              <Table.Cell>
                {item.identification}
              </Table.Cell>
              <Table.Cell>
                <Link to={`${props.baseLink}/${item.userId}`} onClick={() => props.handleLink(`${props.baseLink}/${item.userId}`)}><Icon name="eye" /></Link>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  ) : <Segment inverted color="blue">No hay datos</Segment>;
  return content;
};

export default CardContent;
