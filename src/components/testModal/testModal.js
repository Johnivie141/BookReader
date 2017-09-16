import React ,{Component} from 'react';
import Modal from 'react-modal';

export default class testModal extends Component{


	render(){



const modalStyle = {

     content : {
     border: '100px solid red',
	     zIndex:4,
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }




};


		return(
			<div>

		                  <Modal  isOpen={true} style={modalStyle}
                    contentLabel="DictionaryLookup">
                    <span> TEXT FOR MODATEXT FOR MODALTEXT FOR MODALTEXT FOR MODALTEXT FOR MODALTEXT FOR MODALTEXT FOR MODALTEXT FOR MODALTEXT FOR MODALTEXT FOR MODALTEXT FOR MODALTEXT FOR MODALTEXT FOR MODALTEXT FOR MODALTEXT FOR MODALTEXT FOR MODALTEXT FOR MODALTEXT FOR MODALTEXT FOR MODALTEXT FOR MODALL</span>
			<button onClick={()=>this.closeModal()}>close</button>

                  </Modal>
			</div>
		);
	}
}


		







