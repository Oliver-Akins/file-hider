# Contributing Guidelines

## General Overview
Code can be edited and changed on the `main` branch, any large features or

## Code Style
<ul>
  <li>
    Indents should be done with tabs, one tab character per level of indentation.
  </li>
  <li>
    Functions should only be asynchronous if they need to be.
  </li>
  <li>
    Function names should be <code>camelCase</code>
  </li>
  <li>
    Variable names should be <code>camelCase</code>
  </li>
  <li>
    Constant names should be <code>SCREAMING_SNAKE_CASE</code>, <b>except</b>
    when used in a <code>for ... of</code> loop.
  </li>
  <li>
    Class names should be <code>CapitalCamelCase</code>
  </li>
  <li>
    Brackets should always be included, even if not needed.
<br>
<b>Good</b>:
<pre><code lang="javascript">if ( /* conditional */ ) {
  /* ... snip ... */
};
</code></pre>
<b>Bad</b>:
    <pre><code lang="javascript">if ( /* conditional */ )
  /* ... snip ... */
</code></pre>
  </li>
  <li>
    Semicolons should always be included, even if not needed.
<br>
<b>Good</b>:
<pre><code lang="javascript">if ( /* conditional */ ) {
  console.log(`A statement`);
};
</code></pre>
<b>Bad</b>:
<pre><code lang="javascript">if ( /* conditional */ ) {
  console.log(`A statement`)
}
</code></pre>
  </li>
</ul>


## Extras
If there's anything you think was missed please open a [new discussion](https://github.com/Oliver-Akins/file-hider/discussions/new?category=general)
on GitHub so it can be discussed.