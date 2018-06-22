export const message = {
  first_1: {
    id: "first_1",
    parentId: "origin",
    children: ["first1_nes_1", "first1_nes_2"],
    message: "Hi"
  },
  first1_nes_1: {
    id: "first1_nes_1",
    parentId: "first_1",
    children: ["first1_nes_1_nes_1", "first1_nes_1_nes_2"],
    message: "hi, how are You"
  },
  first1_nes_2: {
    id: "first1_nes_2",
    parentId: "first_1",
    children: ["first1_nes_2_nes_1", "first1_nes_2_nes_2"],
    message: "Hi, how you doing"
  },
  first1_nes_1_nes_1: {
    id: "first1_nes_1_nes_1",
    parentId: "first1_nes_1",
    children: [],
    message: "Good"
  },
  first1_nes_1_nes_2: {
    id: "first1_nes_1_nes_2",
    parentId: "first1_nes_1",
    children: [],
    message: "Good"
  },
  first1_nes_2_nes_1: {
    id: "first1_nes_2_nes_1",
    parentId: "first1_nes_1",
    children: [],
    message: "Good"
  },
  first1_nes_2_nes_1: {
    id: "first1_nes_2_nes_2",
    parentId: "first1_nes_1",
    children: [],
    message: "Good"
  }
};
