#!/bin/bash
# Wrapper para invocar el agente boda-lead con una tarea específica

TASK_FILE="${1:-/tmp/boda-lead-task.txt}"

if [ ! -f "$TASK_FILE" ]; then
    echo "Error: Task file not found: $TASK_FILE"
    exit 1
fi

TASK=$(cat "$TASK_FILE")

# Invocar Claude Code con el agente boda-lead
cd "$(dirname "$0")/../.."
claude --agent boda-lead << EOF
$TASK
EOF
