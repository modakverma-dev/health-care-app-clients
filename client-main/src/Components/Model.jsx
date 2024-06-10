// import React, {useRef, useState} from 'react';
// import {useGLTF} from '@react-three/drei';
// import modelPath from '../assets/medical_pack.glb';
// import {useFrame} from '@react-three/fiber/native';
// import {Dimensions, View} from 'react-native';

// const {width, height} = Dimensions.get('window');
// function Model(props) {
//   const {nodes, materials} = useGLTF(modelPath);
//   const groupRef = useRef();

//   useFrame(() => {
//     groupRef.current.rotation.x = props.mousePosition.value / width + 0.3;
//     groupRef.current.rotation.y = props.mousePosition.value / height;
//     groupRef.current.scale.x = props.mousePosition.value / width + 1;
//     groupRef.current.scale.y = props.mousePosition.value / width + 1.1;
//   });
//   return (
//     <group ref={groupRef} {...props} dispose={null} position={[0, 0.5, 0]}>
//       <directionalLight position={[0, 0, 10]} args={['red', 4]} />
//       <directionalLight position={[-1, 0, 0]} args={['white', 4]} />
//       <directionalLight position={[1, 5, 3]} args={['blue', 2]} />
//       <directionalLight position={[1, 2, 3]} args={['white', 3]} />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Medkit_Medkit_Tex_0.geometry}
//         material={materials.Medkit_Tex}
//         scale={0.1}
//       />
//     </group>
//   );
// }

// useGLTF.preload(modelPath);
// export {Model};
