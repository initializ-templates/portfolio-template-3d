import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "Dummy Project 1",
    url: "",
    image: "projects/univibes.jpg",
    description: "Dummy Project 1 Details",
  },
  {
    title: "Dummy Project 2",
    url: "",
    image: "projects/oj.jpg",
    description: "Dummy Project 2 Details",
  },
  {
    title: "Dummy Project 3",
    url: "",
    image: "projects/Portfolio.jpg",
    description: "Dummy Project 3 Details",
  },
  
  {
    title: "Dummy Project 4",
    url: "",
    image: "projects/Java.jpg",
    description: "Dummy Project 4 Details",
  },
  {
    title: "Dummy Project 5",
    url: "",
    image: "projects/reactjs.jpg",
    description: "Dummy Project 5 Details",
  },
  {
    title: "Dummy Project 6",
    url: "",
    image: "projects/OS.jpg",
    description: "Dummy Project 6 Details",
  },
  
  
  {
    title: "Dummy Project 7",
    url: "",
    image: "projects/pothole.jpg",
    description: "Dummy Project 7 Details",
  },
  {
    title: "Dummy Project 8",
    url: "",
    image: "projects/HE.png",
    description: "Dummy Project 8 Details",
  },
  {
    title: "Dummy Project 9",
    url: "",
    image: "projects/ticklus.jpg",
    description: "Dummy Project 9 Details",
  }
];
const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        // onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, -0.4, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        position={[-1, -0.6, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(0);

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 2.5,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
