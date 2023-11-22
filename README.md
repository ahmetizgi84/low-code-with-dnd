# NOTES

- The "development/v2" branch is the primary branch for development. All developments proceed from this branch.
- Once the major changes/updates on the "development/v2" branch are completed, merge this branch into the "master" branch.

## TODOS

- [ ] moveComponent fonksiyonu helper fonksiyonları refactor edilecek.
- [ ] addComponent fonksiyonu için yeni helper fonksiyonlar yazılacak.
- [ ] layout state'i initial layout ile güncellenecek.

```js
const initialLayout = [
  {
    type: "Container",
    parent: "root",
    id: "container",
    children: [],
    props: {},
  },
];
```

- [ ] Eklenen her yeni componentin id'si `uniqid` kullanılarak dinamik ve eşşiz yapılacak.
- [ ] `moveComponent` ve `addComponent` işlevleri sonrası localStorage güncellenecek ve state persistancy korunacak.
- [ ] "Ready to use components" listesi güncellenecek. Yeni oluşturulan komponentler forwardRef ile sarmallanıp ref alması sağlanacak.
- [ ] `ComponentPreview`, `PreviewContainer` ve `WithChildrenPreviewContainer` komponentleri kaldırılıp `createPage` fonksiyonuna taşınacak
