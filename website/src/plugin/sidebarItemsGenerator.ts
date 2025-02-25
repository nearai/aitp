import type {
  NormalizedSidebarItem,
  SidebarItemsGenerator,
  SidebarItemsGeneratorArgs,
  SidebarItemsGeneratorOption
} from '@docusaurus/plugin-content-docs/lib/sidebars/types';

// Borrowed from https://github.com/facebook/docusaurus/issues/5689#issuecomment-2034815211

interface PostProcessArgs extends Omit<SidebarItemsGeneratorArgs, 'item'> {
  item: NormalizedSidebarItem & {
    customProps?: {
      plannedCapabilities?: string[];
    };
  };
  defaultSidebarItemsGenerator: SidebarItemsGenerator;
}

async function postProcess({item, ...args}: PostProcessArgs) {
  if (item.type === 'category') {
    // Recurse through children
    for (const childItem of item.items) {
      await postProcess({item: childItem, ...args});
    }
    // Add additional items
    if (item.customProps?.plannedCapabilities) {
      item.items.push(
        {
          type: "category",
          label: "Planned",
          items: item.customProps.plannedCapabilities.map(plannedCapability => ({
            type: "html",
            value: plannedCapability,
            defaultStyle: true
          }))
        }
      )
    }
  }
}

const sidebarItemsGenerator: SidebarItemsGeneratorOption = async (
  {
    defaultSidebarItemsGenerator,
    item,
    ...args
  }) => {
  console.log(defaultSidebarItemsGenerator, item, args);
  const sidebarItems = await defaultSidebarItemsGenerator({item, ...args});
  for (const item of sidebarItems) {
    await postProcess({item, defaultSidebarItemsGenerator, ...args});
  }
  return sidebarItems;
};

export default sidebarItemsGenerator;