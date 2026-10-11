# Better Action Sheet Buttons

A Revenge (Classic / Vendetta-style) plugin that lets you **hide buttons** from Discord's message long-press
menu (the "action sheet"), so the ones you never use stop getting in the way.

In the plugin it appears as **HideActionSheetButtons**.

## What you can hide

Each button has its own switch in the plugin's settings:

| Button | Hidden by default |
| --- | --- |
| Apps | yes |
| Mark Unread | yes |
| Copy Text | yes |
| Create Thread | yes |
| Edit Message | yes |
| Delete Message | yes |
| Message | yes |
| Mention | yes |
| Translate Message | no |
| Forward | no |
| Reply | no |
| Pin / Unpin Message | no |
| Copy Message Link | no |
| Silent Delete | no |

Turn a switch on to hide that button, off to show it again. Reopen the menu after changing a setting.

## Scope

**Apply to all action sheets** (on by default) makes the plugin work on every action sheet, not just the
message long-press menu. It is needed for **Message** and **Mention**. Turn it off to only affect the message
long-press menu.

## How it works

When an action sheet opens, the plugin looks through its rows and removes the ones whose label matches a button
you chose to hide. Nothing else about the menu changes, and turning the plugin off puts everything back.

## Notes

- Buttons are matched by their **English label**, so with Discord set to another language some buttons may not
  be hidden.
- If a button will not hide, turn on **Log row labels (debug)** under *Troubleshooting*, open the menu, and
  check Revenge's debug logs to see the exact label Discord uses.
- Because it finds the action sheet by name rather than a fixed module, a Discord update that renames it could
  stop the plugin working until it is updated.

## Install

In Revenge, go to **Plugins → Install** and paste the URL this repo is served from with GitHub Pages
(**Settings → Pages**, source: `main` branch, root):

```
https://dxckie-cell.github.io/Better-Action-Sheet-Buttons/
```

## Files

- `index.js` is the whole plugin.
- `manifest.json` is its manifest.
