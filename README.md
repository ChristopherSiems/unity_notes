# unity_notes

decentralized peer-to-peer platform-agnostic community notes

## Message Schemas

### Add Note

```json
{
  "type": "add_note",
  "statement": "statement content"
}
```

### Get IPs

```json
{
  "type": "get_ips",
  "statement": "statement content"
}
```

### IPs Response

```json
{
  "type": "ips_response",
  "ip hash pairs": [
    "ip1": <hash as 128-bit int>,
    ...
  ]
}
```

### Get Notes

```json
{
  "type": "get_notes",
  "hash": <hash as 128-bit int>
  "notes": [
    "note one",
    ...
  ]
}
```
