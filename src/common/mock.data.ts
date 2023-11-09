import uniqid from "uniqid";
import { IComponent } from "./types";

export const mockResponse: IComponent = {
  type: "Container",
  data: {
    id: `container-${uniqid()}`,
    items: [
      {
        type: "DropZone",
        data: {
          id: `dropZone-${uniqid()}`,
        },
      },
    ],
  },
};

// Chakra layout object
/*
components = {
 "root": {
  "id": "root",
  "parent": "root",
  "type": "Box",
  "children": [],
  "props": {}
 }
}
*/

// react-dnd-example-main layout array
/*
layout = [
   {
      "type": "row",
      "id": "_165esGeZF",
      "children": [
         {
            "type": "column",
            "id": "q8E3Peid6u",
            "children": [
               {
                  "id": "8nLZBAwoR",
                  "type": "component"
               }
            ]
         }
      ]
   }
]
*/

// Bizdeki
/*
  layout={
 "type": "Container",
 "data": {
  "id": "container-lorfl16u",
  "items": [
   {
    "type": "DropZone",
    "data": {
     "id": "dropZone-lorfl16v"
    }
   }
  ]
 }
}

*/

/*
export const mockResponse: IComponent = {
  type: "Container",
  data: {
    id: `container-${uniqid()}`,
    items: [
      {
        type: "DropZone",
        data: {
          id: `dropZone-${uniqid()}`,
        },
      },
      {
        type: "Row",
        data: {
          id: `row-${uniqid()}`,
          items: [
            {
              type: "DropZone",
              data: {
                id: `dropZone-${uniqid()}`,
                className: "w-10 h-auto",
              },
            },
            {
              type: "Column",
              data: {
                id: `column-${uniqid()}`,
                items: [
                  {
                    type: "DropZone",
                    data: {
                      id: `dropZone-${uniqid()}`,
                    },
                  },
                  {
                    type: "Button",
                    data: {
                      id: `button-${uniqid()}`,
                      children: "Button 1",
                      variant: "destructive",
                      size: "lg",
                      asChild: false,
                      action: {
                        type: "call",
                        url: "https://pokeapi.co/api/v2/",
                      },
                    },
                  },
                  {
                    type: "Button",
                    data: {
                      id: `button-${uniqid()}`,
                      children: "Button 2",
                      variant: "secondary",
                      size: "lg",
                      asChild: false,
                      action: {
                        type: "call",
                        url: "https://pokeapi.co/api/v2/",
                      },
                    },
                  },
                  {
                    type: "DropZone",
                    data: {
                      id: `dropZone-${uniqid()}`,
                    },
                  },
                ],
              },
            },
            {
              type: "DropZone",
              data: {
                id: `dropZone-${uniqid()}`,
                className: "w-10 h-auto",
              },
            },
          ],
        },
      },
      {
        type: "DropZone",
        data: {
          id: `dropZone-${uniqid()}`,
        },
      },
    ],
  },
};
*/

export const mockSideBarItems: IComponent[] = [
  {
    type: "Row",
    data: {
      id: `Row-${uniqid()}`,
      items: [
        {
          type: "DropZone",
          data: {
            id: `dropZone-${uniqid()}`,
            className: "w-10",
          },
        },
      ],
    },
  },
  {
    type: "Column",
    data: {
      id: `Column-${uniqid()}`,
      items: [
        {
          type: "DropZone",
          data: {
            id: `dropZone-${uniqid()}`,
          },
        },
      ],
    },
  },

  {
    type: "Button",
    data: {
      id: `Button-${uniqid()}`,
    },
  },
];

export const defaultMockLayout: IComponent = {
  type: "Container",
  data: {
    id: `container-${uniqid()}`,
    items: [
      {
        type: "DropZone",
        data: {
          id: `dropZone-${uniqid()}`,
        },
      },
    ],
  },
};

/*
const mockResponse2: IComponent = {
  type: "Container",
  data: {
    id: "4400936b-6158-1354-9dc8-a04c57e1af46",
    fluid: true,
    items: [
      {
        type: "Card",
        data: {
          id: "26b3f355-2f65-4aae-b9fd-609779f24fdd",
          title: "A custom title",
          headline: "A random Headline",
          copy: "A really long text....",
          items: [
            {
              type: "Button",
              data: {
                id: "4400936b-6158-9087-9dc8-a04c57e1af46",
                children: "Button example",
                // title: "Button example",
                // className: "btn-primary",
                variant: "secondary",
                size: "lg",
                asChild: false,
                action: {
                  type: "call",
                  url: "https://pokeapi.co/api/v2/",
                },
              },
            },
          ],
        },
      },
      {
        type: "Divider",
        data: {
          id: "4400936b-6158-4943-9dc8-dsfhjs32723",
          marginY: 5,
        },
      },
      {
        type: "Card",
        data: {
          id: "4400936b-6158-4943-9dc8-a04c57e1af46",
          title: "Title",
          headline: "This can be anything",
          copy: "A really long text....",
          image: {
            url: "https://i.stack.imgur.com/y9DpT.jpg",
          },
        },
      },
      {
        type: "Divider",
        data: {
          id: "4400936b-6158-4845-9dc8-dsfhjs32723",
          marginY: 5,
        },
      },
      {
        type: "Container",
        data: {
          id: "d76e3a5f-01ad-46f6-a45d-3ad9699ecf99",
          embeddedView: {
            type: "Input",
            data: {
              id: "26b3f355-2f65-4aae-b9fd-609779f24fdd",
              label: "Input",
              type: "password",
              placeholder: "Password",
              isRequired: false,
              minCharactersAllowed: 1,
              maxCharactersAllowed: 100,
              validations: [
                {
                  regexType: "eightOrMoreCharacters",
                  regexErrorCopy: "Use 8 or more characters",
                },
              ],
            },
          },
        },
      },
    ],
  },
};
*/

export default mockResponse;
