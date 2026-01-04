# Rendering Logic I

## Build-in Declarations and Inheritance

Fundamentally the goal of CSS is to allow you to control the appearance and layout of your app's content.

User-agent stylesheet : Built in styles for HTML tags by the browser

Each browser includes their own stylesheet full of base styles

These days , browsers are abit more consistent in how they render elements, and there's a growing awareness that we shouldn't expect our application/ sites to be identical across browsers and devices.

### Inheritance

certain CSS properties **inherit**. When I apply a color to an element, that value gets passed down to all children and grand-children.

Not all CSS properties are inheritable, though.

The people who wrote the CSS spec opted to make certain properties inheritable for convenience. It's a Developer Experience thing.

Most of the properties that inherit are typography-related, like color, font-size, text-shadow, and so on.

#### Forcing inheritance

Occasionally, you may wish to have a property inherit even when it wouldn't normally do so.

```css
a {
  color: inherit;
}
```

## Cascade

Browser's cascade algorithm
Determines which css styles are applied based on the specificity of the selector

ID --> 100
Class / pseudo classes --> 10
Html elements / pseudo elements --> 1

## Block and inline Directions

The web was built for displaying inter-linked documents. A lot of CSS mechanics and terminology are inherited from the print world.

CSS has a block direction (vertical) and an inline direction (horizontal)

### Logical Properties

Works for both left-to-right languages (English) and right-to-left languages (Arabic)

```css
p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
```

Still common for people to use margin left / right / top / bottom
instead of these logical properties

The main selling point for logical properties is internationalization. If you want your product to be available in a left-to-right language like English and a right-to-left language like Arabic, you can save yourself a lot of trouble by using logical properties.

## Box Model

Most common CSS interview question is "can you explain the box model"

The box model is a critical part of the CSS rendering model

Box model consists of

- Content
- Padding
- Border
- Margin

### Box Sizing

```html
<style>
  section {
    width: 500px;
  }
  .box {
    width: 100%;
    padding: 20px;
    border: 4px solid;
  }
</style>

<section>
  <div class="box"></div>
</section>
```

The dimensions of this div with a class box is (548 px x 48 px)

The box-sizing CSS property allows us to change the rules for size calculations. The default value (content-box) only takes the inner content into account, but it offers an alternative value: border-box.

```css
box-sizing: border-box;
```

A new default

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```
